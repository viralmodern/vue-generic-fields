<script>
export default {
  functional: true,
  middleware({ store, redirect, from, route }) {
    const { path } = route
    redirect(`${path}/text`)
  },
}
</script>

<style scoped></style>
