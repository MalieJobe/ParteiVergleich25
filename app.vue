<template>
  <div class="max-w-4xl mx-auto p-4">

    <!-- Header Section -->
    <header class="text-center p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg mb-8">
      <h1 class="text-4xl font-bold mb-2">Positionen der Parteien zur Bundestagswahl 2025</h1>
      <p class="text-lg font-light">Vergleiche die Standpunkte der Parteien zu verschiedenen Themen.</p>
    </header>

    <table class="w-full table-fixed border-collapse border border-gray-200">
      <!-- Partei-Header (Sticky) -->
      <thead class="sticky top-0 bg-gray-100 z-10">
        <tr>
          <th class="p-2 border border-gray-300 bg-white w-52">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Thema suchen..."
              class="w-full p-1 font-normal border border-gray-300 rounded-lg focus:outline-none"
            />
          </th>
          <th v-for="party in parties" :key="party.name" class="p-2 border border-gray-300 h-10">
            <NuxtImg :src="'/logos/' + party.image" :alt="party.name" class="" />
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="category in filteredCategories" :key="category">
          <!-- Sticky Kategoriezeile -->
          <tr class="sticky top-[70px] bg-gray-200 z-10">
            <td colspan="8" class="p-2 font-bold text-center border border-gray-300">
              {{ category }}
            </td>
          </tr>
          <!-- Themenzeilen -->
          <tr v-for="topic in getTopicsByCategory(category)" :key="topic.thema">
            <td class="p-2 border border-gray-300">{{ topic.thema }}</td>
            <td v-for="party in partyKeys" :key="party" class="p-2 text-center border border-gray-300"
              :class="{ 'bg-red-100': topic[party] === 'Kontra',
              'bg-green-100': topic[party] === 'Pro',
              'bg-yellow-100': topic[party] === 'Neutral' }">
              {{ topic[party] }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- Quellenverzeichnis -->
    <footer class="mt-8 text-sm text-gray-600">
      <h2 class="text-lg font-semibold mb-2">Wahlprogramme</h2>
      <h3 class="text-base mb-2">aufgerufen am <time datetime="2025-01-18">18.01.2025</time></h3>
      <ul>
        <li><a href="https://www.die-linke.de/fileadmin/1_Partei/parteitage/Au%C3%9Ferordentlicher_Parteitag_25/Wahlprogramm_Entwurf.pdf" class="text-blue-500 hover:underline">Die Linke</a></li>
        <li><a href="https://cms.gruene.de/uploads/assets/20241216_BTW25_Programmentwurf_DINA4_digital.pdf" class="text-blue-500 hover:underline">Bündnis 90/Die Grünen</a></li>
        <li><a href="https://www.spd.de/fileadmin/Dokumente/Beschluesse/Programm/2025_SPD_Regierungsprogramm.pdf" class="text-blue-500 hover:underline">SPD</a></li>
        <li><a href="https://www.fdp.de/sites/default/files/2024-12/fdp-wahlprogramm_2025.pdf" class="text-blue-500 hover:underline">FDP</a></li>
        <li><a href="https://www.bundestagswahl-bw.de/fileadmin/bundestagswahl-bw/2025/Wahlprogramme/BSW_Wahlprogramm_2025__Entwurf_.pdf" class="text-blue-500 hover:underline">BSW</a></li>
        <li><a href="https://www.politikwechsel.cdu.de/sites/www.politikwechsel.cdu.de/files/docs/politikwechsel-fuer-deutschland-wahlprogramm-von-cdu-csu-1.pdf" class="text-blue-500 hover:underline">CDU/CSU</a></li>
        <li><a href="https://www.afd.de/wp-content/uploads/2024/11/Leitantrag-Bundestagswahlprogramm-2025.pdf" class="text-blue-500 hover:underline">AfD</a></li>
        
      </ul>
    </footer>
  </div>
</template>

<script setup>

// Parties config
const parties = [
  { name: 'Die Linke', image: 'linke.png', color: '#8C3473', key: 'linke' },
  { name: 'Bündnis 90/Die Grünen', image: 'gruene.png', color: '#64A12D', key: 'gruene' },
  { name: 'SPD', image: 'spd.png', color: '#E3000F', key: 'spd' },
  { name: 'FDP', image: 'fdp.png', color: '#FFED00', key: 'fdp' },
  { name: 'Bündnis für Soziale Gerechtigkeit', image: 'bsw.png', color: '#FF7F00', key: 'bsw' },
  { name: 'CDU/CSU', image: 'cdu.png', color: '#000000', key: 'cdu' },
  { name: 'AfD', image: 'afd.png', color: '#009EE0', key: 'afd' }
];

const partyKeys = parties.map(p => p.key);

// Fetch categories and data from API
const { data: categoriesData } = await useFetch('/api/positions', {
  query: {
    type: 'categories'
  }
});
const categories = categoriesData.value.map(c => c.kategorie);

const { data: positionsData } = await useFetch('/api/positions', {
  query: {
    type: 'positions'
  }
});
const positions = positionsData.value;

// Reactive search query
const searchQuery = ref('');

// Filter categories and topics based on the search query
const filteredCategories = computed(() =>
  categories.filter((category) =>
    getTopicsByCategory(category).some((topic) =>
      topic.thema.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )
);

const getTopicsByCategory = (category) => {
  return positions.filter((position) => position.kategorie === category && (!searchQuery.value || position.thema.toLowerCase().includes(searchQuery.value.toLowerCase())));
};
</script>
