async function feed(parent, args, context, info) {
    const where = args.filter
    ? {
        OR: [
            { postContent_contains: args.filter },
        ],
    }
    : {}

    const queriedPosts = await context.db.query.posts({ where, skip: args.skip, first: args.first, orderBy: args.orderBy }, `{id}`,)
    const countSelectionSet = `
        { 
            aggregate {
                count
            }
        }
    `
    const postsConnection = await context.db.query.postsConnection({}, countSelectionSet)

    return {
        count: postsConnection.aggregate.count,
        postIds: queriedPosts.map(post => post.id),
    }
}

module.exports = {
    feed,
}