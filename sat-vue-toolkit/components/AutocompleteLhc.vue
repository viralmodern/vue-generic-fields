<template>
  <div>
    <div style="border: solid 1px red">
      demo6:
      <input type="text" id="demo6">
    </div>
    <div style="border: solid 1px red">
      demo7:
      <input type="text" id="demo7">
    </div>

    <div style="border: solid 1px red">
      demo11:
      <input type="text" id="demo11">
    </div>
    <div style="border: solid 1px red">
      demo12:
      <input type="text" id="demo12">
    </div>
  </div>
</template>

<script>
  import autocomplete from "autocompleter"
  import "autocompleter/autocomplete.min.css"

  const scripts = {
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
    autocompleteLhc: "https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/17.0.3/autocomplete-lhc.js",
    autocompleteLhcStyle: "https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/17.0.3/autocomplete-lhc.min.css"
  }
  export default {
    name: "AutocompleteLhc",
    async mounted () {
      await this.$loadScript(scripts.jquery)
      await this.$loadScript(scripts.autocompleteLhc)
      await this.$loadScript(scripts.autocompleteLhcStyle)
      await this.initAutocomplete()
    },
    methods: {
      async initAutocomplete () {
        /*demo6*/
        let data6 = [17, ["18674", "744", "3520", "3522", "10857", "30966", "3519"], null, [["DDX41", "DEAD-box helicase 41"], ["ASH2L", "ASH2 like, histone lysine methyltransferase complex subunit"], ["EYA2", "EYA transcriptional coactivator and phosphatase 2"], ["EYA4", "EYA transcriptional coactivator and phosphatase 4"], ["SIAH1", "siah E3 ubiquitin protein ligase 1"], ["SIAH1P1", "siah E3 ubiquitin protein ligase 1 pseudogene 1"], ["EYA1", "EYA transcriptional coactivator and phosphatase 1"]]]
        new Def.Autocompleter.Search("demo6", data6, {})
        /*demo7*/
        var colors = ["Primary", "Red", "Green", "Blue",
          "Secondary", "Magenta", "Yellow", "Cyan"]
        var opts7 = {
          codes: ["P", "R", "G", "B", "S", "M", "Y", "C"],
          itemToHeading: {
            R: "P", G: "P", B: "P",
            M: "S", Y: "S", C: "S"
          },
          tableFormat: true
        }
        new Def.Autocompleter.Prefetch("demo7", colors, opts7)
        /*demo11*/
        let res = await this.$api.get("https://satlegal.ebitc.com/api/courts/")
        console.error("RES")
        let opts = [...res["data"]]
        opts = opts.map(o => o["full_name"])
        let a = new Def.Autocompleter.Prefetch("demo11", opts, {
          // tableFormat: true,
          // valueCols: [0],
          // colHeaders: ["Symbol", "Name"]
        })
        console.error("SPA", a)
        /*demo21*/
        new Def.Autocompleter.Search("demo12",
          "https://clinicaltables.nlm.nih.gov/api/genes/v3/search?df=symbol,name_mod",
          {
            tableFormat: true,
            valueCols: [0],
            colHeaders: ["Symbol", "Name"]
          })

      }
    }
  }
</script>

<style scoped lang="scss">
  @import url("https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/17.0.3/autocomplete-lhc.min.css");
</style>
