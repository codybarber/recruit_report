<template>
  <div class="bg-gray-900 min-h-screen">
    <div class="sticky top-0 z-10 bg-gray-900 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h1 class="text-3xl font-bold text-white w-full sm:w-auto">
            <img src="~/assets/img/recruit.png" alt="RecruitReport" class="h-8 sm:h-12">
          </h1>
          
          <!-- Filters -->
          <div class="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto">
            <select v-model="selectedState" class="bg-gray-800 text-white rounded px-2 py-1 sm:px-3 sm:py-2 text-sm">
              <option value="">All States</option>
              <option v-for="state in uniqueStates" :key="state" :value="state">{{ state }}</option>
            </select>
            <select v-model="selectedPosition" class="bg-gray-800 text-white rounded px-2 py-1 sm:px-3 sm:py-2 text-sm">
              <option value="">All Positions</option>
              <option v-for="position in uniquePositions" :key="position" :value="position">{{ position }}</option>
            </select>
            <select v-model="selectedSchool" class="bg-gray-800 text-white rounded px-2 py-1 sm:px-3 sm:py-2 text-sm">
              <option value="">All Schools</option>
              <option v-for="school in uniqueSchools" :key="school" :value="school">{{ formatSchoolName(school) }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="player in filteredPlayers" :key="player._path" class="relative overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <NuxtLink :to="player._path" class="block">
            <div class="relative">
              <img :src="player.person.defaultAssetUrl || 'https://via.placeholder.com/400x300'" :alt="player.name" class="w-full h-48 object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
              <div class="absolute top-2 left-2 flex flex-wrap gap-2">
                <div @click.prevent="setFilter('position', player.positionAbbreviation)" class="bg-white bg-opacity-80 rounded px-2 py-1 text-xs font-semibold cursor-pointer hover:bg-opacity-100">
                  <span class="text-gray-800">{{ player.positionAbbreviation }}</span>
                </div>
                <div class="bg-white bg-opacity-80 rounded px-2 py-1 text-xs font-semibold">
                  <span class="text-gray-800">#{{ player.consensusOverallRank }}</span>
                </div>
                <div @click.prevent="setFilter('state', player.stateAbbreviation)" class="bg-white bg-opacity-80 rounded px-2 py-1 text-xs font-semibold cursor-pointer hover:bg-opacity-100">
                  <span class="text-gray-800">{{ player.stateAbbreviation }}</span>
                </div>
              </div>
              <div v-if="player.person.status.isCommitted" @click.prevent="setFilter('school', player.person.status.committedOrganizationSlug)" class="absolute top-2 right-2 bg-white bg-opacity-80 rounded px-2 py-1 text-xs font-semibold flex items-center cursor-pointer hover:bg-opacity-100">
                <img :src="player.person.status.committedOrganizationAssetUrl" :alt="player.person.status.committedOrganizationSlug" class="w-4 h-4 rounded-full mr-1">
                <span class="text-gray-800">Committed</span>
              </div>
            </div>
            <div class="p-4">
              <h2 class="text-xl font-bold text-white mb-1">{{ player.name }}</h2>
              <p class="text-sm text-gray-300 mb-2">{{ player.person.homeTownName }}</p>
              <p class="text-sm text-gray-400 mb-2">School: {{ player.person?.highSchoolName }}</p>
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                  <span class="text-gray-300 text-sm mr-2">Stars:</span>
                  <div class="flex">
                    <template v-for="i in 5" :key="i">
                      <svg v-if="i <= Math.floor(player.industryStars)" class="h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg v-else class="h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </template>
                  </div>
                </div>
                <div class="text-white font-semibold text-sm">
                  ${{ player.nilValue ? player.nilValue.toLocaleString() : '0' }}/yr
                </div>
              </div>
              <div class="w-full bg-gray-700 bg-opacity-50 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" :style="{ width: `${player.weightedAggregateScore}%` }"></div>
              </div>
              <p class="mt-1 text-xs text-gray-300 text-right">RecruitReport Score: {{ player.weightedAggregateScore.toFixed(2) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-if="filteredPlayers.length === 0" class="text-center py-12">
        <p class="text-gray-400 text-xl">No players found.</p>
      </div>

      <!-- Pagination placeholder -->
      <div class="mt-8 flex justify-center">
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
            Previous
          </a>
          <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
            1
          </a>
          <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
            2
          </a>
          <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
            3
          </a>
          <span class="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400">
            ...
          </span>
          <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
            8
          </a>
          <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
            9
          </a>
          <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700">
            Next
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { data: players } = await useAsyncData('players', async () => {
  const fetchedPlayers = await queryContent('players')
    .where({ consensusOverallRank: { $exists: true } })
    .find()
  return fetchedPlayers
    .map(player => ({
      ...player,
      consensusOverallRank: Number(player.consensusOverallRank) || Infinity,
      weightedAggregateScore: Number(player.weightedAggregateScore) || 0,
      industryStars: Number(player.industryStars) || 0,
      nilValue: Number(player.nilValue) || 0
    }))
    .sort((a, b) => a.consensusOverallRank - b.consensusOverallRank)
})

const selectedState = ref('')
const selectedPosition = ref('')
const selectedSchool = ref('')

const uniqueStates = computed(() => [...new Set(players.value.map(p => p.stateAbbreviation))].sort())
const uniquePositions = computed(() => [...new Set(players.value.map(p => p.positionAbbreviation))].sort())
const uniqueSchools = computed(() => [...new Set(players.value.map(p => p.person.status.committedOrganizationSlug).filter(Boolean))].sort())

const filteredPlayers = computed(() => {
  return players.value.filter(player => 
    (!selectedState.value || player.stateAbbreviation === selectedState.value) &&
    (!selectedPosition.value || player.positionAbbreviation === selectedPosition.value) &&
    (!selectedSchool.value || player.person.status.committedOrganizationSlug === selectedSchool.value)
  )
})

function formatSchoolName(slug) {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

function setFilter(type, value) {
  if (type === 'state') {
    selectedState.value = value;
  } else if (type === 'position') {
    selectedPosition.value = value;
  } else if (type === 'school') {
    selectedSchool.value = value;
  }
}

useHead({
  title: 'Top 250 Player Rankings',
  meta: [
    { name: 'description', content: 'Comprehensive rankings of the top 250 football prospects.' }
  ]
})
</script>

<style>
/* Custom CSS for sticky header */
.sticky {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>

