<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  char: string;
  romaji: string;
  isActive: boolean;
  isPracticeMode: boolean;
  activeChar?: string; // 新增属性
}>();

const cardRef = ref<HTMLElement | null>(null);
const isPlaying = ref(false);
const isRevealed = ref(false);
const rippleStyle = ref({
  top: '0px',
  left: '0px',
  width: '0px',
  height: '0px'
});

// 当切换练习模式时，重置显示状态
watch(() => props.isPracticeMode, () => {
  isRevealed.value = false;
});

// 监听外部激活字符（用于“全部播放”时的视觉同步）
watch(() => props.activeChar, (newVal) => {
  if (newVal && newVal === props.char && cardRef.value) {
    // 自动触发逻辑：从中心点扩散
    const rect = cardRef.value.getBoundingClientRect();
    triggerRipple(rect.width / 2, rect.height / 2);

    // 如果是练习模式，同步显现罗马音
    if (props.isPracticeMode) {
      isRevealed.value = true;
    }
  }
});

const triggerRipple = (x: number, y: number) => {
  if (!cardRef.value) return;
  const rect = cardRef.value.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;

  rippleStyle.value = {
    top: `${y}px`,
    left: `${x}px`,
    width: `${size}px`,
    height: `${size}px`
  };

  // 模拟播放状态（由外部控制声音，这里只控制视觉）
  isPlaying.value = true;
  setTimeout(() => {
    isPlaying.value = false;
  }, 600); // 与 CSS 动画时长保持一致
};

const handleClick = (event: MouseEvent) => {
  if (!props.char || isPlaying.value) return;

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  triggerRipple(x, y);

  if (props.isPracticeMode) {
    isRevealed.value = true;
  }
  speak(props.char);
};

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 1.0;

    // 手动点击时需要通过这些事件保持 isPlaying 状态
    utterance.onstart = () => { isPlaying.value = true; };
    utterance.onend = () => { isPlaying.value = false; };
    utterance.onerror = () => { isPlaying.value = false; };

    window.speechSynthesis.speak(utterance);
  }
};
</script>

<template>
  <div 
    ref="cardRef"
    class="character-card" 
    :class="{ 
      empty: !char, 
      playing: isPlaying, 
      'practice-mode': isPracticeMode && !isRevealed 
    }"
    @click="handleClick"
  >
    <!-- 背景波纹层 -->
    <div 
      v-if="isPlaying" 
      class="ripple" 
      :style="rippleStyle"
    ></div>

    <div v-if="char" class="card-content">
      <span class="japanese">{{ char }}</span>
      <span 
        class="romaji" 
        :class="{ hidden: isPracticeMode && !isRevealed }"
      >
        {{ romaji }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.character-card {
  aspect-ratio: 1;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  user-select: none;
  z-index: 1;
}

.character-card:not(.empty):hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.character-card.playing {
  border-color: var(--primary-color);
  transform: scale(0.98);
}

.ripple {
  position: absolute;
  background: rgba(99, 102, 241, 0.15);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: ripple-animation 0.6s ease-out forwards;
  pointer-events: none;
  z-index: -1;
}

@keyframes ripple-animation {
  from { transform: translate(-50%, -50%) scale(0); opacity: 1; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

.character-card.empty {
  background: transparent;
  box-shadow: none;
  cursor: default;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  pointer-events: none;
}

.japanese {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  transition: color 0.3s;
}

.playing .japanese {
  color: var(--primary-color);
}

.romaji {
  font-size: 0.875rem;
  color: #94a3b8;
  font-family: 'Inter', sans-serif;
  text-transform: lowercase;
  transition: all 0.3s;
}

.romaji.hidden {
  opacity: 0;
  transform: translateY(5px);
}

@media (max-width: 640px) {
  .japanese {
    font-size: 1.5rem;
  }
}
</style>