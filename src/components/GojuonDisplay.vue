<script setup lang="ts">
import GojuonCard from './GojuonCard.vue';
import type { Category } from '../composables/useGojuon';

defineProps<{
  isPracticeMode: boolean;
  activeCategory: Category;
  characters: string[][];
  romajiData: string[][];
  shuffledList: { char: string; romaji: string }[];
  activeChar: string;
}>();
</script>

<template>
  <div class="display-container">
    <!-- 练习模式：显示乱序列表 -->
    <div v-if="isPracticeMode" class="shuffle-grid">
      <GojuonCard 
        v-for="(item, index) in shuffledList" 
        :key="`${item.char}-${index}`"
        :char="item.char"
        :romaji="item.romaji"
        :isActive="true"
        :isPracticeMode="isPracticeMode"
        :activeChar="activeChar"
      />
    </div>

    <!-- 普通模式：显示标准五十音图网格 -->
    <div v-else class="gojuon-grid" :class="activeCategory">
      <div v-for="(row, rowIndex) in characters" :key="rowIndex" class="gojuon-row">
        <GojuonCard 
          v-for="(char, colIndex) in row" 
          :key="colIndex"
          :char="char"
          :romaji="romajiData[rowIndex][colIndex]"
          :isActive="true"
          :isPracticeMode="isPracticeMode"
          :activeChar="activeChar"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.display-container {
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

.shuffle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
}

@media (max-width: 640px) {
  .gojuon-grid, .shuffle-grid { gap: 8px; }
  .gojuon-row { gap: 8px; }
  .shuffle-grid { grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); }
}
</style>