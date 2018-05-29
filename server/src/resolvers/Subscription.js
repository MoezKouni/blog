function newPostSubscribe (parent, args, context, info) {
    return context.db.subscription.post(
        { where: { mutation_in: ['CREATED'] } },
        info,
    )
}

const newPost = {
    subscribe: newPostSubscribe
}

function newLikeSubscribe (parent, args, context, info) {
    return context.db.subscription.like(
        { where: { mutation_in: ['CREATED'] } },
        info,
    )
}

const newLike = {
    subscribe: newLikeSubscribe
}


module.exports = {
    newPost,
    newLike,
}