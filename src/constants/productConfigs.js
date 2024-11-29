export const TERPENES = [
  { id: 'myrcene', name: 'Myrcene', description: 'Earthy, musky, fruity' },
  { id: 'limonene', name: 'Limonene', description: 'Citrus, fresh, energetic' },
  { id: 'pinene', name: 'Pinene', description: 'Pine, fresh, focused' },
  { id: 'caryophyllene', name: 'Caryophyllene', description: 'Peppery, spicy, woody' },
  { id: 'linalool', name: 'Linalool', description: 'Floral, sweet, relaxing' },
  { id: 'humulene', name: 'Humulene', description: 'Hoppy, earthy' },
  { id: 'terpinolene', name: 'Terpinolene', description: 'Piney, floral, herbal' },
  { id: 'ocimene', name: 'Ocimene', description: 'Sweet, herbal, woody' }
];

export const EFFECTS = [
  { id: 'relaxed', name: 'Relaxed', description: 'Calming and peaceful' },
  { id: 'happy', name: 'Happy', description: 'Uplifting and joyful' },
  { id: 'euphoric', name: 'Euphoric', description: 'Intense happiness' },
  { id: 'uplifted', name: 'Uplifted', description: 'Mood elevation' },
  { id: 'creative', name: 'Creative', description: 'Enhanced imagination' },
  { id: 'energetic', name: 'Energetic', description: 'Increased energy' },
  { id: 'focused', name: 'Focused', description: 'Mental clarity' },
  { id: 'sleepy', name: 'Sleepy', description: 'Sedating effects' }
];

export const PRODUCT_CATEGORIES = [
  {
    id: 'thca-flower',
    name: 'THCA Flower',
    fields: [
      { 
        name: 'photos', 
        label: 'Product Photos', 
        type: 'photos',
        multiple: true,
        category: 'thca-flower',
        tooltip: 'Upload product photos (main photo will be used as thumbnail)'
      },
      {
        name: 'thcaPercentage',
        label: 'THCA Percentage',
        type: 'number',
        step: '0.01',
        tooltip: 'THCA content percentage'
      },
      {
        name: 'strain',
        label: 'Strain Type',
        type: 'select',
        options: ['Indica', 'Sativa', 'Hybrid'],
        tooltip: 'Type of cannabis strain'
      },
      {
        name: 'terpenes',
        label: 'Terpene Profile',
        type: 'multiselect',
        options: TERPENES,
        tooltip: 'Select all present terpenes'
      },
      {
        name: 'effects',
        label: 'Effects',
        type: 'multiselect',
        options: EFFECTS,
        tooltip: 'Select all applicable effects'
      },
      {
        name: 'indoor',
        label: 'Indoor Grown',
        type: 'boolean',
        checkboxLabel: 'Indoor cultivation',
        tooltip: 'Check if grown indoors'
      }
    ]
  },
  {
    id: 'disposables',
    name: 'Disposables',
    fields: [
      { 
        name: 'photos', 
        label: 'Product Photos', 
        type: 'photos',
        multiple: true,
        category: 'disposables',
        tooltip: 'Upload product photos'
      },
      {
        name: 'capacity',
        label: 'Capacity (ml)',
        type: 'number',
        step: '0.1',
        tooltip: 'Device capacity in milliliters'
      },
      {
        name: 'batterySize',
        label: 'Battery Size (mAh)',
        type: 'number',
        tooltip: 'Battery capacity in milliamp hours'
      },
      {
        name: 'flavor',
        label: 'Flavor',
        type: 'text',
        tooltip: 'Product flavor name'
      },
      {
        name: 'rechargeable',
        label: 'Rechargeable',
        type: 'boolean',
        checkboxLabel: 'Device is rechargeable',
        tooltip: 'Check if device can be recharged'
      }
    ]
  },
  {
    id: 'edibles',
    name: 'Edibles',
    fields: [
      { 
        name: 'photos', 
        label: 'Product Photos', 
        type: 'photos',
        multiple: true,
        category: 'edibles',
        tooltip: 'Upload product photos'
      },
      {
        name: 'servingSize',
        label: 'Serving Size',
        type: 'text',
        tooltip: 'Size of one serving'
      },
      {
        name: 'servingsPerPackage',
        label: 'Servings Per Package',
        type: 'number',
        tooltip: 'Number of servings in package'
      },
      {
        name: 'ingredients',
        label: 'Ingredients',
        type: 'textarea',
        tooltip: 'List of ingredients'
      },
      {
        name: 'allergens',
        label: 'Allergens',
        type: 'multiselect',
        options: [
          'Milk', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts', 
          'Peanuts', 'Wheat', 'Soybeans'
        ],
        tooltip: 'Select all allergens present'
      }
    ]
  },
  {
    id: 'kratom',
    name: 'Kratom',
    fields: [
      { 
        name: 'photos', 
        label: 'Product Photos', 
        type: 'photos',
        multiple: true,
        category: 'kratom',
        tooltip: 'Upload product photos'
      },
      {
        name: 'strain',
        label: 'Strain',
        type: 'select',
        options: ['Red Vein', 'Green Vein', 'White Vein', 'Yellow Vein'],
        tooltip: 'Type of kratom strain'
      },
      {
        name: 'origin',
        label: 'Origin',
        type: 'text',
        tooltip: 'Country or region of origin'
      },
      {
        name: 'form',
        label: 'Form',
        type: 'select',
        options: ['Powder', 'Capsules', 'Extract', 'Tablets'],
        tooltip: 'Product form'
      },
      {
        name: 'labTested',
        label: 'Lab Tested',
        type: 'boolean',
        checkboxLabel: 'Product is lab tested',
        tooltip: 'Check if product has been lab tested'
      }
    ]
  },
  {
    id: 'cbd',
    name: 'CBD Products',
    fields: [
      { 
        name: 'photos', 
        label: 'Product Photos', 
        type: 'photos',
        multiple: true,
        category: 'cbd',
        tooltip: 'Upload product photos'
      },
      {
        name: 'cbdContent',
        label: 'CBD Content (mg)',
        type: 'number',
        tooltip: 'Amount of CBD in milligrams'
      },
      {
        name: 'type',
        label: 'Product Type',
        type: 'select',
        options: ['Oil', 'Topical', 'Edible', 'Capsule', 'Flower'],
        tooltip: 'Type of CBD product'
      },
      {
        name: 'spectrum',
        label: 'Spectrum',
        type: 'select',
        options: ['Full Spectrum', 'Broad Spectrum', 'Isolate'],
        tooltip: 'CBD spectrum type'
      },
      {
        name: 'thirdPartyTested',
        label: 'Third Party Tested',
        type: 'boolean',
        checkboxLabel: 'Product is third party tested',
        tooltip: 'Check if product has been independently tested'
      }
    ]
  }
];