<template>
  <div>
    <div v-if="pending" class="p-10 flex justify-center">
      <VProgressCircular indeterminate />
    </div>
    <div v-else>
      <div v-if="!error">
        <VList v-if="!!(data.data) && data.data.length > 0">
          <VListItem v-for="video in data.data" :key="video.id" :title="video.id" :subtitle="formatDate(video.timestamp)" prepend-icon="mdi-video">
            <template v-slot:append>
              <a :href="`http://localhost:8000/videos/${video.id}`" title="Download Audio File" class="hover:rounded-full hover:bg-gray-100 p-2" download>
                <VIcon icon="mdi-download" />
              </a>
            </template>
          </VListItem>
        </VList>
        <span v-else class="text-gray-400">There are no videos...</span>
      </div>
      <div v-else>
        Could not load list of videos... Try it again.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {videosGetAll} from "~/services/videos.service";
import dayjs from "dayjs";

function formatDate(timestamp: number) {
  return dayjs.unix(timestamp).toDate().toLocaleString()
}

const { data, pending, error } = await videosGetAll()


</script>
