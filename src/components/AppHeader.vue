<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const toggleLanguage = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh';
};
</script>

<template>
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
    </div>
  </header>
</template>

<style scoped>
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

.lang-btn:hover { background: #e2e8f0; }

.header-content { max-width: 900px; margin: 0 auto; }

.title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -0.025em;
}

.accent { color: var(--primary-color); }

.subtitle {
  color: #64748b;
  font-size: 1.125rem;
}

@media (max-width: 640px) {
  .title { font-size: 2rem; }
  .header { padding: 60px 15px 30px; }
  .lang-switcher { top: 15px; right: 15px; }
}
</style>