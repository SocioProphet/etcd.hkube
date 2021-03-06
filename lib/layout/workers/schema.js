const getSchema = {
    type: 'object',
    properties: {
        workerId: {
            type: 'string'
        }
    },
    required: [
        'workerId'
    ]
};

const setSchema = {
    type: 'object',
    properties: {
        workerId: {
            type: 'string'
        }
    },
    required: [
        'workerId',
    ]
};

const deleteSchema = {
    type: 'object',
    properties: {
        workerId: {
            type: 'string'
        }
    },
    required: [
        'workerId'
    ]
};

const watchSchema = {
    type: 'object',
    properties: {
        workerId: {
            type: 'string',
            default: ''
        }
    }
};

const listSchema = {
    type: 'object',
    properties: {
        workerId: {
            type: 'string',
            default: ''
        }
    }
};

module.exports = {
    getSchema,
    setSchema,
    deleteSchema,
    watchSchema,
    listSchema
};
