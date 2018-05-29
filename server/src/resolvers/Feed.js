function posts(parent, args, context, info) {
    return context.db.query.posts({ where: { id_in: parent.linkIds } }, info)
}

module.exports = {
    posts,
}