<template>
  <div style="display: flex; flex-direction: column; height: 100%">
    <div class="banner top-banner" style="padding: 10px; background: #f5f5f5">
      <span>{{ formattedValue }}</span>
    </div>
    <div ref="plotContainer" style="flex: 1"></div>
    <div class="banner bottom-banner" style="padding: 10px; background: #f5f5f5">
      <span>{{ domainObject.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewWrapExample',
  inject: ['openmct', 'isEditing', 'viewOptions'],
  props: {
    domainObject: {
      type: Object,
      required: true
    },
    objectPath: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      formattedValue: 'Loading...',
      originalView: null
    };
  },
  created() {
    const metadata = this.openmct.telemetry.getMetadata(this.domainObject);
    const valueMetadata = metadata.valuesForHints(['range'])[0];
    const formatter = this.openmct.telemetry.getValueFormatter(valueMetadata);

    this.unsubscribe = this.openmct.telemetry.subscribe(this.domainObject, (datum) => {
      this.formattedValue = formatter.format(datum[valueMetadata.key]);
    });
  },
  mounted() {
    this.showPlotView();
  },
  beforeUnmount() {
    if (this.originalView) {
      this.originalView.destroy();
    }

    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  methods: {
    showPlotView() {
      // Get and show the original plot view
      const objectViewProvider = this.openmct.objectViews.getByProviderKey('plot-single');

      if (objectViewProvider) {
        this.originalView = objectViewProvider.view(this.domainObject, this.objectPath);
        this.originalView.show(this.$refs.plotContainer, this.isEditing, this.viewOptions);
      }
    }
  }
};
</script>
