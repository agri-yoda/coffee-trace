// Mongoose Module
const mongoose = require('mongoose')

// Moment Module
const moment = require('moment')

// Import Schema
const {
    Schema
} = mongoose

// Create Schema
const CoffeeSchema = new Schema({
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    attributes: {
        category: {
            type: String,
            required: true,
            default: 'Arabica'
        },
        botanical_variety: {
            type: String,
            required: true,
            default: 'bourbon'
        },
        grade: {
            type: String,
            required: true,
            default: 'speciality'
        },
        bean_sizes: {
            type: String,
            required: true,
            default: 'aa'
        },
        preparation_method: {
            type: String,
            required: true,
            default: 'dry'
        },
        moisture: {
            type: Number,
            required: true,
            default: 0
        },
        outturn: {
            type: Number,
            required: true,
            default: 0
        },
        cup_score: {
            type: Number,
            required: true,
            default: 0
        },
        description: {
            type: String,
            required: true,
            default: 'Default Coffee Description'
        },
        price_range: {
            type: Number,
            required: true,
            default: 0
        },
        quantity_available: {
            type: Number,
            required: true,
            default: 0
        },
        est_quantity_available: {
            type: Number,
            required: true,
            default: 0
        },
        harvest_months: {
            type: [String],
            default: []
        },
    },
    origin: {
        country_of_origin: {
            type: String,
            required: true,
            default: 'India'
        },
        _plantation: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },
        famers: {
            type: [Schema.Types.Mixed],
            default: []
        },
        public: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    flavours: {
        taste: {
            note: {
                type: String,
                default: 'Note'
            },
            sub_note: {
                type: String,
                default: 'Sub Note'
            },
        },
        flavour: {
            note: {
                type: String,
                default: 'Note'
            },
            sub_note: {
                type: String,
                default: 'Sub Note'
            },
        },
        aroma: {
            note: {
                type: String,
                default: 'Note'
            },
            sub_note: {
                type: String,
                default: 'Sub Note'
            },
        },
        acidity: {
            type: String,
            default: 'Floral'
        },
        finish: {
            type: [Schema.Types.Mixed],
            default: []
        },
         beverage_ideality: {
            type: String,
            default: 'Floral'
         }
    },
    location: {
        sku_number: {
            type: Schema.Types.Mixed
        },
        warehouse_location: {
            geo: {
                latitude: {
                    type: Schema.Types.Mixed,
                    default: 'latitude'
                },
                longitude: {
                    type: Schema.Types.Mixed,
                    default: 'longitude'
                },
            },
            name: {
                type: String,
            }
        },
        geo: {
            latitude: {
                type: Schema.Types.Mixed,
                default: 'latitude'
            },
            longitude: {
                type: Schema.Types.Mixed,
                default: 'longitude'
            },
        },
        name: {
            type: String,
            default: 'Location Name'
        },
    },
    profile_picture: {
        type: String,
        default: 'default_coffee.png'
    },
    created_date: {
        type: Date,
        default: moment().format()
    }
})

// Define Model
const Coffee = mongoose.model('Coffee', CoffeeSchema)

// Export Model
module.exports = Coffee
