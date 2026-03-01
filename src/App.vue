<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGojuon } from './composables/useGojuon';
import AppHeader from './components/AppHeader.vue';
import AppControls from './components/AppControls.vue';
import GojuonDisplay from './components/GojuonDisplay.vue';

const { locale } = useI18n();
const {
  activeCategory,
  mode,
  isPracticeMode,
  isSpeakingAll,
  activeChar,
  shuffledList,
  currentData,
  speakAll
} = useGojuon();

// 监听语言变化，动态修改 HTML 的 lang 属性以修复字体渲染问题
watch(locale, (newLang) => {
  document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : 'en';
}, { immediate: true });
</script>

<template>
  <div class="app-container">
    <AppHeader />

    <main class="main-content">
      <AppControls 
        v-model:activeCategory="activeCategory"
        v-model:mode="mode"
        v-model:isPracticeMode="isPracticeMode"
        :isSpeakingAll="isSpeakingAll"
        @speakAll="speakAll"
      />

      <div class="spacer"></div>

      <GojuonDisplay 
        :isPracticeMode="isPracticeMode"
        :activeCategory="activeCategory"
        :characters="mode === 'hiragana' ? currentData.hiragana : currentData.katakana"
        :romajiData="currentData.romaji"
        :shuffledList="shuffledList"
        :activeChar="activeChar"
      />
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
  /* 优化后的字体栈：优先使用系统默认中文字体，确保中文 UI 渲染一致 */
  font-family: 'Inter', system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', 'Source Han Sans SC', 'Noto Sans CJK SC', sans-serif;
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

.main-content {
  flex: 1;
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.spacer { height: 40px; }

.footer {
  text-align: center;
  padding: 40px;
  color: #94a3b8;
  font-size: 0.875rem;
}

@media (max-width: 640px) {
  .spacer { height: 24px; }
}
</style>