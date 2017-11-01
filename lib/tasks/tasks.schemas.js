const getTasksSchema = {
    "type": "object",
    "properties": {
        "etcdOptions": {
            "type": "object",
            "default": { recursive: true }
        },
        "suffix": {
            "default": '',
            "type": "string"
        },
        "jobId": {
            "required": true,
            "type": "string"
        },
        "taskId": {
            "default": '',
            "type": "string"
        }
    }
}

const getSetTaskSchema = {
    "type": "object",
    "properties": {
        "data": {
            "default": {},
            "type": ["object", "any"]
        },
        "jobId": {
            "required": true,
            "type": "string"
        },
        "taskId": {
            "required": true,
            "type": "string"
        },
        "suffix": {
            "default": '',
            "type": "string"
        }
    }
}

const watchSchema = {
    "type": "object",
    "properties": {
        "etcdOptions": {
            "default": { wait: true, recursive: true },
            "type": "object"
        },
        "index": {
            "default": null,
            "type": ["integer", "null"]
        },
        "jobId": {
            "type": "string",
            "default": '',
        },
        "taskId": {
            "type": "string",
            "default": '',
        },
        "prefix": {
            "default": '',
            "type": "string"
        },
        "subfix": {
            "default": '',
            "type": "string"
        },
        "suffix": {
            "default": '',
            "type": "string"
        }
    }
}

module.exports = {
    getTasksSchema,
    getSetTaskSchema,
    watchSchema
};