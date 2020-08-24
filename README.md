# OpenMCT Additions
Plugins and other additional code for openmct



## My Other Items
My Other Items will add a new root level folder to your openmct installation.

To install:
- add the "my-other-items" folder alongside the "my-items" folder in "/openmct/platform/features/"
- add `'../platform/features/my-other-items/bundle'` to "openmct/src/installDefaultBundles.js" define's arguments
- add `MyOtherItems: 'platform/features/my-other-items'` to the bundleMap const in "/openmct/src/plugins/plugins.js"
- add `openmct.install(openmct.plugins.MyOtherItems());` to index.html (or wherever you're installing plugins)
