const async = require('async')
const ObjectId = require('mongoose').Types.ObjectId

const utility = require('../../helper/utility')
const Models = require('../../model/mongo')
const {CategoryPost} = Models

module.exports = (router) => {
  router.get('/category-posts', (req, res) => {
    try {
      CategoryPost.find({ isActive: true, isDelete: false }, (error, data) => {
        if (error) return utility.apiResponse(res, 500, error.toString())
        return utility.apiResponse(res, 200, 'success', data)
      })
    } catch (error) { utility.apiResponse(res, 500, error.toString()) }
  })
  router.get('/category-post', (req, res) => {
    try {
      const {strKey, isDelete, pageSize, pageNumber, colSort, typeSort} = req.query
      const query = {}
      const sort = colSort && typeSort ? { [colSort]: typeSort === 'asc' ? 1 : -1 } : null
      if (strKey) { query['$text'] = { $search: strKey } }
      query['isDelete'] = isDelete === 'true'
      const total = (cb) => CategoryPost.count(query, (err, data) => cb(err, data))

      const list = (cb) => CategoryPost.find(query, (err, categories) => cb(err, categories)).skip(parseInt(pageSize) * (parseInt(pageNumber) - 1)).limit(parseInt(pageSize)).sort(sort)

      async.parallel({ total, list }, (error, data) => {
        if (error) return utility.apiResponse(res, 500, error.toString())
        return utility.apiResponse(res, 200, 'success', data)
      })
    } catch (error) { utility.apiResponse(res, 500, error.toString(), null) }
  })

  router.get('/category-post/:id', (req, res) => {
    try {
      let {id} = req.params
      CategoryPost.findOne({_id: ObjectId(id)}, (error, data) => {
        if (error) return utility.apiResponse(res, 500, error.toString())
        return utility.apiResponse(res, 200, 'success', data)
      })
    } catch (error) { return utility.apiResponse(res, 500, error, null) }
  })

  router.post('/category-post', (req, res) => {
    try {
      let data = req.body
      data['isDelete'] = false
      let categoryPost = new CategoryPost(data)
      var error = categoryPost.validateSync()

      if (error) {
        var errorKeys = Object.keys(error.errors)
        return utility.apiResponse(res, 500, error.errors[errorKeys[0].message].toString())
      }

      categoryPost.save((err, data) => {
        if (err) return utility.apiResponse(res, 500, err.toString())
        return utility.apiResponse(res, 200, 'success', data)
      })
    } catch (e) {
      return utility.apiResponse(res, 500, 'server error')
    }
  })

  router.put('/category-post/:id', (req, res) => {
    try {
      let field = req.body
      delete field.id
      CategoryPost.findOneAndUpdate({ _id: ObjectId(req.params.id) }, field, {new: true}, (err, data) => {
        if (err) return utility.apiResponse(res, 500, err.toString())
        return utility.apiResponse(res, 200, 'success', data)
      })
    } catch (err) {
      return utility.apiResponse(res, 500, err, null)
    }
  })

  router.delete('/category-post/:id', (req, res) => {
    try {
      var { id } = req.params
      CategoryPost.deleteOne({_id: ObjectId(id)}, (err) => {
        if (err) return utility.apiResponse(res, 500, err.toString())
        return utility.apiResponse(res, 200, 'success', true)
      })
    } catch (error) {
      utility.apiResponse(res, 500, 'Server error', null)
    }
  })
}
