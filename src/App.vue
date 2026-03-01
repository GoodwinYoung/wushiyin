<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { SEION, DAKUON, YOON } from './data/gojuon';
import GojuonCard from './components/GojuonCard.vue';

const { locale } = useI18n();

// 监听语言变化，动态修改 HTML 的 lang 属性以修复字体渲染问题
watch(locale, (newLang) => {
  document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : 'en';
}, { immediate: true });

type Category = 'seion' | 'dakuon' | 'yoon';
const activeCategory = ref<Category>('seion');
const mode = ref<'hiragana' | 'katakana'>('hiragana');
const isPracticeMode = ref(false);

const currentData = computed(() => {
  switch (activeCategory.value) {
    case 'seion': return SEION;
    case 'dakuon': return DAKUON;
    case 'yoon': return YOON;
    default: return SEION;
  }
});

const characters = computed(() => mode.value === 'hiragana' ? currentData.value.hiragana : currentData.value.katakana);
const romajiData = computed(() => currentData.value.romaji);

const toggleMode = (newMode: 'hiragana' | 'katakana') => {
  mode.value = newMode;
};

const setCategory = (cat: Category) => {
  activeCategory.value = cat;
};

const toggleLanguage = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh';
};

const isSpeakingAll = ref(false);

const speakAll = () => {
  // 如果已经在播放，则停止当前播放（起切换/停止作用）
  if (isSpeakingAll.value) {
    window.speechSynthesis.cancel();
    isSpeakingAll.value = false;
    return;
  }

  // 先清空队列中可能存在的点击发音
  window.speechSynthesis.cancel();
  
  const flattened = characters.value.flat().filter(c => c !== '');
  let index = 0;
  isSpeakingAll.value = true;
  
  const speakNext = () => {
    // 如果中途被手动停止了，则退出递归
    if (!isSpeakingAll.value) return;

    if (index < flattened.length) {
      const utterance = new SpeechSynthesisUtterance(flattened[index]);
      utterance.lang = 'ja-JP';
      utterance.onend = () => {
        index++;
        // 延迟一小会儿播放下一个，增加停顿感
        setTimeout(speakNext, 300);
      };
      
      // 处理可能的错误或被取消的情况
      utterance.onerror = () => {
        isSpeakingAll.value = false;
      };

      window.speechSynthesis.speak(utterance);
    } else {
      isSpeakingAll.value = false;
    }
  };
  
  speakNext();
};
</script>

<template>
  <div class="app-container">
    <header class="header">
      <div class="lang-switcher">
        <button @click="toggleLanguage" class="lang-btn">
          {{ $t('lang') }}
        </button>
      </div>
      
      <div class="header-content">
        <h1 class="title">
          <template v-if="locale === 'en'">
            {{ $t('title') }} <span class="accent">{{ $t('accent') }}</span>
          </template>
          <template v-else>
            {{ $t('title') }}<span class="accent">{{ $t('accent') }}</span>
          </template>
        </h1>
        <p class="subtitle">{{ $t('subtitle') }}</p>
        
        <div class="category-tabs">
          <button 
            v-for="cat in (['seion', 'dakuon', 'yoon'] as Category[])" 
            :key="cat"
            @click="setCategory(cat)"
            class="tab-btn"
            :class="{ active: activeCategory === cat }"
          >
            {{ $t(cat) }}
          </button>
        </div>

        <div class="controls-wrapper">
          <div class="mode-selector">
            <button 
              @click="toggleMode('hiragana')" 
              class="toggle-btn" 
              :class="{ active: mode === 'hiragana' }"
            >
              {{ $t('hiragana') }}
            </button>
            <button 
              @click="toggleMode('katakana')" 
              class="toggle-btn" 
              :class="{ active: mode === 'katakana' }"
            >
              {{ $t('katakana') }}
            </button>
          </div>

          <label class="practice-switch">
            <input type="checkbox" v-model="isPracticeMode">
            <span class="switch-track">
              <span class="switch-text">{{ $t('practiceMode') }}</span>
              <span class="switch-thumb"></span>
            </span>
          </label>
          
          <button 
            @click="speakAll" 
            class="audio-btn" 
            :class="{ playing: isSpeakingAll }"
            :title="$t('speakAll')"
          >
            <template v-if="!isSpeakingAll">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </template>
            <template v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </template>
            {{ $t('speakAll') }}
          </button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="gojuon-grid" :class="activeCategory">
        <div v-for="(row, rowIndex) in characters" :key="rowIndex" class="gojuon-row">
          <GojuonCard 
            v-for="(char, colIndex) in row" 
            :key="colIndex"
            :char="char"
            :romaji="romajiData[rowIndex][colIndex]"
            :isActive="true"
            :isPracticeMode="isPracticeMode"
          />
        </div>
      </div>
    </main>
    
    <footer class="footer">
      <p>{{ $t('footer') }}</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #6366f1;
  --bg-color: #f8fafc;
  --text-color: #1e293b;
  --header-bg: #ffffff;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', 'Source Han Sans SC', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: var(--header-bg);
  padding: 20px 20px 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  text-align: center;
  position: relative;
}

.lang-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
}

.lang-btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #475569;
}

.lang-btn:hover {
  background: #e2e8f0;
}

.header-content {
  max-width: 900px;
  margin: 0 auto;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -0.025em;
}

.accent {
  color: var(--primary-color);
}

.subtitle {
  color: #64748b;
  font-size: 1.125rem;
  margin-bottom: 24px;
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #64748b;
}

.tab-btn.active {
  background: var(--primary-color);
  color: #ffffff;
  border-color: var(--primary-color);
}

.controls-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.mode-selector {
  display: flex;
  background: #f1f5f9;
  padding: 6px;
  border-radius: 12px;
  width: fit-content;
}

.toggle-btn {
  padding: 8px 24px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  color: #64748b;
}

.toggle-btn.active {
  background: #ffffff;
  color: var(--primary-color);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

/* New Practice Switch Styles */
.practice-switch {
  position: relative;
  display: inline-block;
  width: 120px;
  height: 40px;
  cursor: pointer;
  user-select: none;
}

.practice-switch input {
  display: none;
}

.switch-track {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
}

.switch-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  z-index: 1;
  transition: color 0.3s;
  /* Prevent text from shifting too much */
  margin-left: 18px; 
}

.switch-thumb {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

input:checked + .switch-track {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

input:checked + .switch-track .switch-text {
  color: white;
  margin-left: 0;
  margin-right: 18px;
}

input:checked + .switch-track .switch-thumb {
  left: calc(100% - 36px);
}

.practice-switch:hover .switch-track {
  border-color: #cbd5e1;
}

.audio-btn {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 10px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  color: #475569;
}

.audio-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.audio-btn.playing {
  background: var(--primary-color);
  color: #ffffff;
  border-color: var(--primary-color);
}

.main-content {
  flex: 1;
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.gojuon-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.gojuon-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.gojuon-grid.yoon .gojuon-row {
  grid-template-columns: repeat(3, 1fr);
}

.footer {
  text-align: center;
  padding: 40px;
  color: #94a3b8;
  font-size: 0.875rem;
}

@media (max-width: 640px) {
  .title {
    font-size: 2rem;
  }
  
  .gojuon-grid {
    gap: 8px;
  }
  
  .gojuon-row {
    gap: 8px;
  }
  
  .header {
    padding: 60px 15px 30px;
  }

  .lang-switcher {
    top: 15px;
    right: 15px;
  }
}
</style>