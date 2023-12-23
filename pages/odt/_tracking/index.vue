<script>
export default {
  functional: true,
  middleware({ store, redirect, route }, error) {
    let {
      params: { tracking },
    } = route
    if (tracking === 'l') {
      redirect(`/odt/l/1`)
    } else {
      redirect(`/odt/d/1/dockets`)
    }
  },
}
</script>

<style scoped></style>
