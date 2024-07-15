<template>
  <div v-if="player" class="bg-gray-900 min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <button @click="$router.back()" class="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        &larr; Back
      </button>
      
      <div class="relative overflow-hidden shadow-lg rounded-lg mb-8 h-96">
        <div class="absolute inset-0">
          <img :src="player.person.defaultAssetUrl || 'https://via.placeholder.com/1200x400'" :alt="player.name" class="w-full h-full object-cover object-top">
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900"></div>
        </div>
        <div class="relative h-full flex flex-col justify-end px-6 py-8">
          <h1 class="text-4xl font-bold text-white mb-2">{{ player.name }}</h1>
          <p class="text-xl text-gray-300">{{ player.positionAbbreviation }} | {{ player.person.homeTownName }}</p>
          <div class="mt-4 flex space-x-2">
            <div class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              #{{ player.overallRank }} Overall
            </div>
            <div class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              #{{ player.positionRank }} {{ player.positionAbbreviation }}
            </div>
            <div class="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              #{{ player.stateRank }} {{ player.stateAbbreviation }}
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-2xl font-bold text-white">Recruit Report Player Score</h2>
        </div>
        <div class="border-t border-gray-700 px-4 py-5">
          <div class="text-center">
            <p class="text-3xl font-bold text-white">{{ player.weightedAggregateScore.toFixed(2) }}</p>
            <p class="text-sm text-gray-400 mt-1">Weighted Aggregate Score</p>
          </div>
          <div class="mt-4 w-full bg-gray-700 rounded-full h-4">
            <div class="bg-blue-500 h-4 rounded-full" :style="{ width: `${player.weightedAggregateScore}%` }"></div>
          </div>
        </div>
      </div>

      <div class="bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-2xl font-bold text-white">Player Details</h2>
        </div>
        <div class="border-t border-gray-700 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-700">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-400">High School</dt>
              <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{{ player.person.highSchoolName }}</dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-400">Stars</dt>
              <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                <div class="flex items-center">
                  <span class="mr-2">{{ player.industryStars }}</span>
                  <div class="flex">
                    <svg v-for="i in 5" :key="i" class="h-5 w-5" :class="i <= player.industryStars ? 'text-yellow-400' : 'text-gray-600'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-400">NIL Value</dt>
              <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">${{ Number(player.nilValue).toLocaleString() }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-2xl font-bold text-white">Ratings</h2>
        </div>
        <div class="border-t border-gray-700">
          <dl>
            <div v-for="(rating, index) in ratings" :key="index" class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" :class="{ 'bg-gray-750': index % 2 === 0 }">
              <dt class="text-sm font-medium text-gray-400">{{ rating.name }}</dt>
              <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                <div class="flex items-center">
                  <span class="mr-2">{{ rating.rating.toFixed(2) }}</span>
                  <div class="w-full bg-gray-600 rounded-full h-2.5">
                    <div class="bg-blue-500 h-2.5 rounded-full" :style="{ width: `${rating.rating}%` }"></div>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-2xl font-bold text-white">Recruitment Status</h2>
        </div>
        <div class="border-t border-gray-700 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-700">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-400">Committed</dt>
              <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{{ player.person.status.isCommitted ? 'Yes' : 'No' }}</dd>
            </div>
            <div v-if="player.person.status.isCommitted" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-400">Committed To</dt>
              <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{{ formatCommittedTo(player.person.status.committedOrganizationSlug) }}</dd>
            </div>
            <div v-if="player.person.status.isCommitted" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-400">Commitment Date</dt>
              <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{{ new Date(player.person.status.commitmentDate).toLocaleDateString() }}</dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-400">Signed</dt>
              <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{{ player.person.status.isSigned ? 'Yes' : 'No' }}</dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-400">Enrolled</dt>
              <dd class="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{{ player.person.status.isEnrolled ? 'Yes' : 'No' }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div v-if="predictions.length > 0" class="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-2xl font-bold text-white">Predictions</h2>
        </div>
        <div class="border-t border-gray-700">
          <ul class="divide-y divide-gray-700">
            <li v-for="(prediction, index) in predictions" :key="index" class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-blue-400 truncate">{{ prediction.organization }}</p>
                <div class="ml-2 flex-shrink-0 flex">
                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {{ prediction.percent.toFixed(2) }}%
                  </p>
                </div>
              </div>
              <div class="mt-2 sm:flex sm:justify-between">
                <div class="sm:flex">
                  <p class="flex items-center text-sm text-gray-400">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    {{ prediction.distance.toFixed(2) }} miles
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const { path } = useRoute()
const { data: player } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne())

const ratings = computed(() => {
  if (!player.value) return []
  return [
    { name: 'Industry', rating: player.value.industryRating },
    { name: 'Consensus', rating: player.value.consensusRating },
    { name: 'On3', rating: player.value.on3Rating },
    { name: '247Sports', rating: player.value.twofoursevenRating },
    { name: 'ESPN', rating: player.value.espnRating },
    { name: 'Rivals', rating: normalizeRivalsRating(player.value.rivalsRating) },
  ].filter(r => r.rating !== undefined)
})

const predictions = computed(() => {
  if (!player.value) return []
  const predictions = []
  if (player.value.prediction_1_organization) {
    predictions.push({
      organization: player.value.prediction_1_organization,
      percent: parseFloat(player.value.prediction_1_percent),
      distance: parseFloat(player.value.prediction_1_distance)
    })
  }
  if (player.value.prediction_2_organization) {
    predictions.push({
      organization: player.value.prediction_2_organization,
      percent: parseFloat(player.value.prediction_2_percent),
      distance: parseFloat(player.value.prediction_2_distance)
    })
  }
  return predictions.sort((a, b) => b.percent - a.percent)
})

function normalizeRivalsRating(rating) {
  // Assuming Rivals rating is out of 6.1
  return rating ? (rating / 6.1) * 100 : 0;
}

function formatCommittedTo(slug) {
  if (!slug) return '';
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

useHead({
  title: player.value?.name || 'Player Profile',
  meta: [
    { name: 'description', content: `Profile and rankings for ${player.value?.name}, a ${player.value?.positionAbbreviation} prospect from ${player.value?.person?.homeTownName}.` }
  ]
})
</script>