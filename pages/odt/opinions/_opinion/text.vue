<template>
  <TextViewODT :content="textContent" />
</template>

<script>
import TextViewODT from '~/features/odt/TextViewODT'
export default {
  components: { TextViewODT },
  props: {
    detail1: {
      default: () =>
        `466 U.S. 668 104 S.Ct. 2052 80 L.Ed.2d 674 Charles E. STRICKLAND, Superintendent, Florida State Prison, et al., Petitionersv.David Leroy WASHINGTON. No. 82-1554. Supreme Court of the United States Argued Jan. 10, 1984. Decided May 14, 1984. Rehearing Denied June 25, 1984. Syllabus Respondent pleaded guilty in a Florida trial court to an indictment that included three capital murder charges. In the plea colloquy, respondent told`,
    },
    detail: {},
  },
  computed: {
    textContent() {
      return this.detail.text ?? this.detail1
    },
  },
}
</script>

<style scoped></style>
