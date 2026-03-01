<script setup lang="ts">
import type { Category } from '../composables/useGojuon';

defineProps<{
  activeCategory: Category;
  mode: 'hiragana' | 'katakana';
  isPracticeMode: boolean;
  isSpeakingAll: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:activeCategory', val: Category): void;
  (e: 'update:mode', val: 'hiragana' | 'katakana'): void;
  (e: 'update:isPracticeMode', val: boolean): void;
  (e: 'speakAll'): void;
}>();
</script>

<template>
  <div class="controls-section">
    <div class="category-tabs">
      <button 
        v-for="cat in (['seion', 'dakuon', 'yoon'] as Category[])" 
        :key="cat"
        @click="emit('update:activeCategory', cat)"
        class="tab-btn"
        :class="{ active: activeCategory === cat }"
      >
        {{ $t(cat) }}
      </button>
    </div>

    <div class="controls-wrapper">
      <div class="mode-selector">
        <button 
          @click="emit('update:mode', 'hiragana')" 
          class="toggle-btn" 
          :class="{ active: mode === 'hiragana' }"
        >
          {{ $t('hiragana') }}
        </button>
        <button 
          @click="emit('update:mode', 'katakana')" 
          class="toggle-btn" 
          :class="{ active: mode === 'katakana' }"
        >
          {{ $t('katakana') }}
        </button>
      </div>

      <label class="practice-switch" :class="{ active: isPracticeMode }">
        <input 
          type="checkbox" 
          :checked="isPracticeMode" 
          @change="emit('update:isPracticeMode', ($event.target as HTMLInputElement).checked)"
        >
        <span class="switch-track">
          <!-- 始终在轨道内部居中或偏移展示文字，圆点单独浮层 -->
          <span class="switch-text">{{ $t('practiceMode') }}</span>
          <span class="switch-thumb"></span>
        </span>
      </label>
      
      <button 
        @click="emit('speakAll')" 
        class="audio-btn" 
        :class="{ playing: isSpeakingAll, hidden: isPracticeMode }"
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
</template>

<style scoped>
/* ... existing styles ... */
.audio-btn.hidden {
  visibility: hidden;
  pointer-events: none;
}
/* ... remaining styles ... */
.controls-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
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

/* Redesigned Switch */
.practice-switch {
  position: relative;
  display: inline-block;
  min-width: 150px;
  height: 44px;
  cursor: pointer;
  user-select: none;
}

.practice-switch input { display: none; }

.switch-track {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #f1f5f9;
  border: 2px solid #e2e8f0;
  border-radius: 22px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
}

.switch-text {
  font-size: 0.875rem;
  font-weight: 700;
  color: #64748b;
  z-index: 1;
  transition: all 0.3s;
  width: 100%;
  text-align: center;
  /* 初始状态：文字整体向左偏移，给右侧圆点留空间 */
  padding-left: 10px;
  padding-right: 40px;
}

.switch-thumb {
  position: absolute;
  top: 4px;
  right: 4px; /* 初始圆点在右侧 */
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

/* 激活状态逻辑 */
.practice-switch.active .switch-track {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.practice-switch.active .switch-text {
  color: white;
  /* 激活状态：文字整体向右偏移，给左侧圆点留空间 */
  padding-left: 40px;
  padding-right: 10px;
}

.practice-switch.active .switch-thumb {
  /* 圆点滑到左侧 */
  right: calc(100% - 36px);
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

.audio-btn:hover { background: #f8fafc; border-color: #cbd5e1; }

.audio-btn.playing {
  background: var(--primary-color);
  color: #ffffff;
  border-color: var(--primary-color);
}
</style>