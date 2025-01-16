<template>
  <div class="container mx-auto p-4">
    <table class="w-full table-auto border-collapse border border-gray-200">
      <!-- Partei-Header (Sticky) -->
      <thead class="sticky top-0 bg-gray-100 z-10">
        <tr>
          <th class="p-2 border border-gray-300 bg-white"></th>
          <th v-for="party in parties" :key="party.name" class="p-2 border border-gray-300">
            <div class="flex flex-col items-center">
              <img :src="'/logos/' + party.image" :alt="party.name" class="h-10" />
              <span class="text-xs font-bold" :style="{ color: party.color }">{{ party.name }}</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="category in categories" :key="category">
          <!-- Sticky Kategoriezeile -->
          <tr class="sticky top-[50px] bg-gray-200 z-10">
            <td colspan="8" class="p-2 font-bold text-center border border-gray-300">
              {{ category }}
            </td>
          </tr>
          <!-- Themenzeilen -->
          <tr v-for="topic in getTopicsByCategory(category)" :key="topic.thema">
            <td class="p-2 border border-gray-300">{{ topic.thema }}</td>
            <td v-for="party in partyKeys" :key="party" class="p-2 text-center border border-gray-300">
              {{ topic[party] }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { getAllPositions, getCategories } from '@/utils/db.js';

// Parties config
const parties = [
  { name: 'Die Linke', image: 'linke.png', color: '#8C3473', key: 'linke' },
  { name: 'Bündnis 90/Die Grünen', image: 'gruene.png', color: '#64A12D', key: 'gruene' },
  { name: 'SPD', image: 'spd.png', color: '#E3000F', key: 'spd' },
  { name: 'FDP', image: 'fdp.png', color: '#FFED00', key: 'fdp' },
  { name: 'Bündnis für Soziale Gerechtigkeit', image: 'bsw.png', color: '#FF7F00', key: 'bsw' },
  { name: 'CDU/CSU', image: 'union.png', color: '#000000', key: 'cdu' },
  { name: 'AfD', image: 'afd.png', color: '#009EE0', key: 'afd' }
];

const partyKeys = parties.map(p => p.key);

// Fetch categories and data
const categories = getCategories().map(c => c.kategorie);
const positions = getAllPositions();

// Function to filter topics by category
const getTopicsByCategory = (category) => {
  return positions.filter(position => position.kategorie === category);
};
</script>
