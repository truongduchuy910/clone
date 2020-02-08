var mongoose = require('mongoose')
module.exports = {
    user: mongoose.model('user', mongoose.Schema({
        local: {
            email: String,
            password: String
        },
        facebook: {
            id: String,
            token: String,
            email: String,
            name: String,
            displayName: String,
            data: Array,
            connect: Array
        },
        twitter: {
            id: String,
            token: String,
            displayName: String,
            username: String
        },
        google: {
            id: String,
            token: String,
            email: String,
            name: String
        },
        rule_token: String,
        publish: {
            facebook_post: String,
            google_post: String,
            website_post: String,
            zalo_post: String,
            instagram_post: String,
            adwords: String
        },
        setting: {
            facebook: {
                connect: Array
            }
        },
        dashboard: Object


    })),
    store: mongoose.model('store', mongoose.Schema(
        {
            data: Buffer,
            contentType: String
        }
    )),
    attribute: mongoose.model('attributes', mongoose.Schema(
        {
            name: String,
            content: String
        }
    )),
    hashtag: mongoose.model('hashtag', mongoose.Schema(
        {
            name: String,
            content: String
        }
    )),
    product: {
        basis: mongoose.model('product.basis', mongoose.Schema(
            {
                createDate: Date,
                modifyDate: Date,
                name: String,
                price: Number,
                sale: Number,
                images: Array
            }
        )),
        information: mongoose.model('product.details', mongoose.Schema(
            {
                name: String,
                delta: Object,
                pointId: String
            }
        )),
        attribute: mongoose.model('product.attributes', mongoose.Schema(
            {
                name: String,
                content: String,
                pointId: String
            }
        ))
    },
    post: {
        basis: mongoose.model('post.basis', mongoose.Schema(
            {
                name: String,
                title: String,
                short: String
            }
        )),
        information: mongoose.model('post.informations', mongoose.Schema(
            {
                name: String,
                delta: Object,
                pointName: String
            }
        )),
        hashtag: mongoose.model('post.hashtag', mongoose.Schema(
            {
                name: String,
                content: String,
                pointName: String
            }
        ))
    },
    banner: mongoose.model('banner', mongoose.Schema(
        {
            name: String,
            content: String,
            type: String,
            images: Array
        }
    )),
}
