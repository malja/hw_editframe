<template>
  <VContainer>
    <VRow>
      <VCol>
        <h1>Editframe</h1>
      </VCol>
    </VRow>

    <VRow>
      <VCol>
        <VCard>
          <VCardTitle>Create New Video</VCardTitle>
          <VCardText>
            <VideoCreateNew @submited="reloadKey++"/>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VRow>
      <VCol>
        <VCard>
          <VCardTitle>List Of Videos</VCardTitle>
          <VCardText>
            <VideoList :key="reloadKey" />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
const reloadKey = ref(0)
</script>
