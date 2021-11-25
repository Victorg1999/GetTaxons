<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-form
            enctype="multipart/form-data"
          >
            <div>
              <div>
                <b-form-group>
                  <label for="taxonid">Taxon Id</label>
                  <b-button
                    v-b-tooltip.hover
                    title="must insert a valid taxon id"
                    style="border: none"
                    variant="outline-info"
                    class="mb-2"
                  >
                  </b-button>
                  <b-input-group>
                    <b-form-input
                      required
                      id="taxonid"
                      v-model="form.taxonId"
                      :state="Boolean(form.taxon)"
                    >
                    </b-form-input>

                    <b-button @click="onTaxonSelected">
                      Get Taxons
                    <ModalTaxons :taxontype="taxontype" v-on:selected-taxon="selectedItem()" v-on="onChildClicked()"></ModalTaxons>
                    </b-button>
                    <!--<b-button @click="onTaxonSelected">Get Taxon</b-button>-->
                  <!--  <b-input-group-append>
                        <ModalTaxons v-model="Taxons" />
                <b-button v-b-modal.modal-1 @click="getTaxon">
                  Get Taxon
                </b-button>

                <b-modal id="modal-1" title="BootstrapVue">
                  <p class="my-4">{{ Taxons }}</p>
                </b-modal>
                     -- <b-button @click="getTaxon">Get Taxon</b-button> --
                    </b-input-group-append> -->
                   <!-- <modal-taxons :taxontype="taxontype" />-->
                  </b-input-group>
                </b-form-group>
              </div>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import ModalTaxons from "../components/modal/ModalTaxons.vue";
import checkListService from "../services/CheckListService";
//import sampleService from "../services/SampleServices";
//import ENASearchService from "../services/ENASearchService"
export default {
  name: "sample-input-form",
  components: {
    ModalTaxons,
  },
  data() {
    return {
      taxontype: Object,
      fieldGroups: [],
      message: "",
      checklistResponse: "",
      checkListState: false,
      form: {
        taxonId: "",
        taxon: null,
        checklist: "",
        fields: {},
      },
    };
  },
  methods: {
    onChildClicked(value){
      this.message = value
    },
    onTaxonSelected(value){
      this.taxon = value
      this.$root.$emit('bv::show::modal', 'modal-taxons')
      console.log(this.taxon);
    }
    },
    getEnaChecklist() {
      checkListService
        .getEnaRecord(this.form.checklist)
        .then((response) => {
          var xml2js = require("xml2js");
          var parser = new xml2js.Parser();
          parser.parseStringPromise(response.data).then((result) => {
            this.joinFields(
              result.CHECKLIST_SET.CHECKLIST[0].DESCRIPTOR[0].FIELD_GROUP
            );
            this.fieldGroups =
              result.CHECKLIST_SET.CHECKLIST[0].DESCRIPTOR[0].FIELD_GROUP;
            this.checkListState = true;
            this.checklistResponse =
              result.CHECKLIST_SET.CHECKLIST[0].DESCRIPTOR[0].DESCRIPTION[0];
          });
        })
        .catch((e) => {
          this.checklistResponse = e;
        });
    },
    getTaxon() {
      checkListService
        .getEnaRecord(this.form.taxonId)
        .then((response) => {
          var xml2js = require("xml2js");
          var parser = new xml2js.Parser();
          parser.parseStringPromise(response.data).then((result) => {
            const taxon = result.TAXON_SET.taxon[0];
            //this.taxontype = taxon
            this.Taxons = taxon;
            this.message = taxon["$"].scientificName;
            console.log(response.data);
          });
        })
        .catch((e) => {
          this.message = e;
        });
    },
    joinFields(fields) {
      var mergedList = [];
      fields.forEach((element) => {
        mergedList = mergedList.concat(element.FIELD);
      });
      mergedList.forEach((field) => {
        var name = field.NAME[0];
        var units = field.UNITS;
        this.$set(
          this.form.fields,
          name,
          units ? { value: null, unit: units[0].UNIT } : { value: null }
        );
      });
      return mergedList;
    },
    isTextInput(field) {
      return field.FIELD_TYPE && field.FIELD_TYPE[0].TEXT_FIELD;
    },
    isMultipleChoice(field) {
      return field.FIELD_TYPE && field.FIELD_TYPE[0].TEXT_CHOICE_FIELD;
    },
    testRegex(field) {
      if (
        field.FIELD_TYPE[0].TEXT_FIELD[0] &&
        field.FIELD_TYPE[0].TEXT_FIELD[0].REGEX_VALUE
      ) {
        const regex = new RegExp(
          field.FIELD_TYPE[0].TEXT_FIELD[0].REGEX_VALUE[0]
        );
        return regex.test(this.form.fields[field.NAME[0]].value);
      } else {
        return null;
      }
    },
    makeToast(variant = null, message = null, title = null) {
      this.$bvToast.toast(`${message || "Failed"}`, {
        title: `${title || "Failed"}`,
        variant: variant,
        autoHideDelay: 5000,

        appendToast: true,
      });
    },
};
</script>
<style>
.buttons-form {
  display: block;
}
</style>