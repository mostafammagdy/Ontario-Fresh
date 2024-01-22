/**
 * PROFILES contains the unique properties for the profiles checkboxes group. Add or remove objects if you need to add or remove profiles from the group.
 */
export const PROFILES = [
    {
        "label": "Vendor",
        "value": "vendor",
        "description": "My business sells products directly to individual consumers.",
        "index": 0
    },
    {
        "label": "Seller",
        "value": "seller",
        "description": "My business sells wholesale products to restaurants and other food businesses.",
        "index": 1
    },
    {
        "label": "Buyer",
        "value": "buyer",
        "description": "My business buys in wholesale quantities for restaurants and other food businesses.",
        "index": 3
    },
    {
        "label": "Processor",
        "value": "processor",
        "description": "My business processes food or beverages.",
        "index": 2
    },
    {
        "label": "Service Provider",
        "value": "service_provider",
        "description": "My business provides products and services to other Ontario food businesses.",
        "index": 4
    },
]

export const LOCATIONS_BUSINESS_HOURS_DEFAULT = {
    // primaryLocation: false,
    id: '',
    description: '',
    address_1: '',
    address_2: '',
    city: '',
    province: 'Ontario',
    postal_code: '',
    country: 'Canada',
    phone: ''
}

export const LOCATIONS_BUSINESS_HOURS_ERROR_MESSAGES_DEFAULT= {
    description: null,
    address_1: null,
    city: null,
    postal_code: null,
    messageList: []
}

export const KEYS = {
    tab: 9,
    enter: 13,
    esc: 27,
    space: 32,
    pageUp: 33,
    pageDown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40
}

export const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5242880;

export const FILE_UPLOAD_FORMATS = {
    documents: '.pdf, .doc, .docx',
    images: '.jpg, .jpeg, .png, .gif, .bmp'
}

export const PRODUCT_CATEGORIES = [
    {
        id: 4,
        textId: 'fruit',
        name: 'Fruit',
        products: {
            buyer: [],
            seller: [],
            vendor: [],
            processor: []
        }
    },
    {
        id: 10,
        textId: 'vegetables',
        name: 'Vegetables',
        products: {
            buyer: [],
            seller: [],
            vendor: [],
            processor: []
        }
    },
    {
        id: 6,
        textId: 'meat',
        name: 'Meat and Poultry',
        products: {
            buyer: [],
            seller: [],
            vendor: [],
            processor: []
        }
    },
    {
        id: 2,
        textId: 'dairyEggs',
        name: 'Dairy and Eggs',
        products: {
            buyer: [],
            seller: [],
            vendor: [],
            processor: []
        }
    },
    {
        id: 3,
        textId: 'fish',
        name: 'Fish',
        products: {
            buyer: [],
            seller: [],
            vendor: [],
            processor: []
        }
    },
    {
        id: 9,
        textId: 'preparedFoodCondiments',
        name: 'Prepared Food and Condiments',
        products: {
            buyer: [],
            seller: [],
            vendor: [],
            processor: []
        }
    },
    {
        id: 5,
        textId: 'grains',
        name: 'Grains',
        products: {
            buyer: [],
            seller: [],
            vendor: [],
            processor: []
        }
    },
    {
        id: 8,
        textId: 'nutsSeedsHerbs',
        name: 'Nuts, Seeds and Herbs',
        products: {
            buyer: [],
            seller: [],
            vendor: [],
            processor: []
        }
    },
    {
        id: 1,
        textId: 'alcoholicBeverages',
        name: 'Alcoholic Beverages',
        products: {
            buyer: [],
            seller: [],
            vendor: [],
            processor: []
        }
    },
    {
        id: 7,
        textId: 'nonAlcoholicBeverages',
        name: 'Non-Alcoholic Beverages',
        products: {
            buyer: [],
            seller: [],
            vendor: [],
            processor: []
        }
    },
    {
        id: 0,
        textId: 'other',
        name: 'Other',
        products: {
            buyer: [],
            seller: [],
            vendor: [],
            processor: []
        }
    },
]