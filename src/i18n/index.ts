import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    title: 'Learn Japanese',
    accent: 'Gojuon',
    subtitle: 'Master the basics of Japanese characters',
    hiragana: 'Hiragana',
    katakana: 'Katakana',
    speakAll: 'Speak All',
    practiceMode: 'Practice Mode',
    seion: 'Basic (Seion)',
    dakuon: 'Dakuon/Handakuon',
    yoon: 'Yoon',
    footer: 'Interactive Gojuon Study Tool • Made with Vue 3 & TypeScript',
    lang: '中文'
  },
  zh: {
    title: '日语',
    accent: '五十音图',
    subtitle: '掌握日语假名的基础读写',
    hiragana: '平假名',
    katakana: '片假名',
    speakAll: '全部播放',
    practiceMode: '练习模式',
    seion: '清音',
    dakuon: '浊音/半浊音',
    yoon: '拗音',
    footer: '日语五十音交互学习工具 • 使用 Vue 3 & TypeScript 构建',
    lang: 'English'
  }
};

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
});

export default i18n;