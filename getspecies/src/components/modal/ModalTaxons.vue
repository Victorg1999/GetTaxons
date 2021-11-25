<template>
  <b-modal :title="taxontype.scientificName" id="modal-taxons">
    <b-col>
          <b-card >
            <b-card-body>
              <b-card-text>
                <strong>Scientific Name </strong> {{taxontype.scientificName}}
              </b-card-text>
              <b-card-text>
                <strong>taxID </strong> {{taxontype.taxId}}
              </b-card-text>
              <b-card-text>
                <strong>rank </strong> {{taxontype.rank}}
              </b-card-text>
              <b-card-text>
                <strong>hidden </strong> {{taxontype.hidden}}
              </b-card-text>
            </b-card-body>
          </b-card>
        </b-col>

        <!--<b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.lineage variant="dark">Lineage</b-button>
            </b-card-header>
              <b-collapse id="lineage" accordion="lineage" role="tabpanel">
                <b-card-body>
                  <b-card-text v-for="taxon in taxon.taxon_lineage" v-bind:key="taxon">
                    <p v-if="this.form.taxon !== 'root'">
                       <strong>{{taxon}}: </strong>{{taxon}} 
                    </p>  
                  </b-card-text>
                </b-card-body>
              </b-collapse>
          </b-card>-->
  </b-modal>
</template>

<script>
export default {
  name: "modal-taxons",
  props: ['taxontype'],
  data() {
    return {};
  },
  methods: {
    selectedItem(item){
      if(item.length>0){
        this.$emit('selected-taxon', item[0].accession);
      }
    }
  },
};
</script>