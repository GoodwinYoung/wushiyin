import { ref, computed, watch } from 'vue';
import { SEION, DAKUON, YOON } from '../data/gojuon';

export type Category = 'seion' | 'dakuon' | 'yoon';

export function useGojuon() {
  const activeCategory = ref<Category>('seion');
  const mode = ref<'hiragana' | 'katakana'>('hiragana');
  const isPracticeMode = ref(false);
  const isSpeakingAll = ref(false);
  const activeChar = ref('');
  const shuffledList = ref<{ char: string; romaji: string }[]>([]);

  const currentData = computed(() => {
    switch (activeCategory.value) {
      case 'seion': return SEION;
      case 'dakuon': return DAKUON;
      case 'yoon': return YOON;
      default: return SEION;
    }
  });

  const performShuffle = () => {
    const data = currentData.value;
    const chars = mode.value === 'hiragana' ? data.hiragana : data.katakana;
    const romajis = data.romaji;
    
    let list: { char: string; romaji: string }[] = [];
    
    for (let r = 0; r < chars.length; r++) {
      for (let c = 0; c < chars[r].length; c++) {
        if (chars[r][c]) {
          list.push({
            char: chars[r][c],
            romaji: romajis[r][c]
          });
        }
      }
    }
    
    // Fisher-Yates Shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    
    shuffledList.value = list;
  };

  const speakAll = () => {
    if (isSpeakingAll.value) {
      window.speechSynthesis.cancel();
      isSpeakingAll.value = false;
      activeChar.value = '';
      return;
    }

    window.speechSynthesis.cancel();
    
    if (isPracticeMode.value) return;

    const data = currentData.value;
    const chars = (mode.value === 'hiragana' ? data.hiragana : data.katakana).flat().filter(c => c !== '');
    
    let index = 0;
    isSpeakingAll.value = true;
    
    const speakNext = () => {
      if (!isSpeakingAll.value) {
        activeChar.value = '';
        return;
      }

      if (index < chars.length) {
        const currentChar = chars[index];
        activeChar.value = currentChar; // 更新当前正在播放的字符

        const utterance = new SpeechSynthesisUtterance(currentChar);
        utterance.lang = 'ja-JP';
        utterance.onend = () => {
          index++;
          setTimeout(speakNext, 300);
        };
        utterance.onerror = () => {
          isSpeakingAll.value = false;
          activeChar.value = '';
        };
        window.speechSynthesis.speak(utterance);
      } else {
        isSpeakingAll.value = false;
        activeChar.value = '';
      }
    };
    
    speakNext();
  };

  // 监听状态变化以触发乱序或停止播放
  watch([isPracticeMode, mode, activeCategory], ([newPractice]) => {
    window.speechSynthesis.cancel();
    isSpeakingAll.value = false;
    activeChar.value = '';
    
    if (newPractice) {
      performShuffle();
    }
  }, { immediate: true });

  return {
    activeCategory,
    mode,
    isPracticeMode,
    isSpeakingAll,
    activeChar,
    shuffledList,
    currentData,
    speakAll
  };
}
