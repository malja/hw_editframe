<template>
  <VForm v-model="isValid">
    <VContainer>
      <VRow>
        <VCol>
          <VTextField v-model="options.audioUrl" label="Audio URL" type="text" :rules="[rules.url]" prepend-inner-icon="mdi-microphone" placeholder="Link to audio file..." />
        </VCol>
      </VRow>

      <VRow>
        <VCol>
          <VTextField v-model="options.imageUrl" label="Image URL" type="text" :rules="[rules.url]" prepend-inner-icon="mdi-panorama-variant-outline" placeholder="Link to image file..." />
        </VCol>
      </VRow>

      <VRow>
        <VCol>
          <h3>Text</h3>
        </VCol>
      </VRow>

      <VRow>
        <VCol>
          <VTextField v-model="options.text.value" label="Text" type="text" :rules="[rules.notEmpty]" placeholder="Text to show..." prepend-inner-icon="mdi-text-short" />
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="9">
          <VRow>
            <VCol>
              <VTextField v-model="options.text.position.x" label="X Coord" type="number" :rules="[rules.numerical, rules.positive]" placeholder="0" prepend-inner-icon="mdi-axis-x-arrow" />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VTextField v-model="options.text.position.y" label="Y Coord" type="number" :rules="[rules.numerical, rules.positive]" placeholder="0" prepend-inner-icon="mdi-axis-y-arrow" />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VTextField v-model="options.text.size" label="Size" type="number" :rules="[rules.numerical, rules.positive]" placeholder="12" prepend-inner-icon="mdi-format-size" />
            </VCol>
          </VRow>
        </VCol>

        <VCol cols="3">
          <VColorPicker v-model="options.text.color" />
        </VCol>

      </VRow>

      <VRow>
        <VCol>
          <VBtn :disabled="!isValid" color="primary" @click="onSubmit">Create</VBtn>
        </VCol>
      </VRow>
    </VContainer>

  </VForm>
</template>

<script lang="ts" setup>
import {videosCreate} from "~/services/videos.service";
import { SimpleVideoComposerOptions } from '@ef/video_composer'
import rules from "~/utils/validation.util";
import {Ref} from "vue";

const emit = defineEmits<{
  (e: 'submitted'): void,
}>()

const defaultOptions = {
  audioUrl: "",
  imageUrl: "",

  text: {
    value: "",
    size: 12,
    position: {
      x: 0,
      y: 0
    },
    color: "#FFFFFF"
  }
} satisfies SimpleVideoComposerOptions

const options: Ref<SimpleVideoComposerOptions> = ref(Object.assign({}, defaultOptions))

const isValid = ref(true)

async function onSubmit() {
  try {
    const data = await videosCreate(options.value)
    options.value = Object.assign({}, defaultOptions)
    emit('submitted')
  } catch (e: any) {
    console.error('ERROR!', e)
  }
}
</script>
