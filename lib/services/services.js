const djsv = require('djsv');
const { setSchema, getSchema } = require('../schema');
const EventEmitter = require('events');
const path = require('path');
const { PREFIX } = require('../consts');
const pipelineDriver = require('./services.pipelineDriver');

class services {
    constructor() {
        this.setSchema = djsv(setSchema);
        this.getSchema = djsv(getSchema);
        this.pipelineDriver = new pipelineDriver();
    }

    init(parent) {
        this.parent = parent;
        this.pipelineDriver.init({ etcd: this.parent, services: this });
    }

    /**
     *  the start method used for begin storing data 
     * @param {object} options 
     * @param {object} options.data  object that need to be stored in etcd if update is needed use update function
     * @param {string} options.serviceName the path that will be store on etcd if not assigned than it gets the one from the init
     * @param {string} options.instanceId the specific guid the default data is a generated guid
     * @param {string} options.suffix suffix can be service or discovery or just ''
     * @memberOf EtcdDiscovery
     */
    async set(options) {
        const schemaInstance = this.setSchema(options, { ignoreNull: true });
        if (schemaInstance.valid) {
            const { data, instanceId, serviceName, suffix } = schemaInstance.instance;
            const internalServiceName = serviceName ? serviceName : this.parent._serviceName
            const internalInstanceId = instanceId ? instanceId : this.parent._instanceId;
            const _path = path.join('/', PREFIX.SERVICES, internalServiceName, internalInstanceId, suffix);
            try {
                return await this.parent._keyRegister(_path, null, data);
            }
            catch (error) {
                throw error;
            }
        } else {
            throw new Error(schemaInstance.errors[0].stack);
        }
    }

    /**
     * get the current messages returns object with the current value and watch object
     * 
     * @param {object} options 
     * @param {string} options.serviceName the path that will be store on etcd from a const file that contains etcd names 
     * @param {string} options.instanceId the specific guid the default data is a generated guid
     * @param {string} options.prefix prefix can be service or discovery or just ''
     * @param {string} options.suffix suffix can be service or discovery or just ''
     * @param {any} options.etcdOptions etcd options the default is  {recursive: true}
     * @param {bool}options.etcdOptions.recursive (bool, list all values in directory recursively)
     * @param {bool}options.etcdOptions.wait (bool, wait for changes to key)
     * @param {integer}options.etcdConfig.waitIndex (wait for changes after given index)

     * 
     * @memberOf EtcdDiscovery
     */

    get(options) {
        return new Promise((res, rej) => {
            const schemaInstance = this.getSchema(options, { ignoreNull: true });
            if (schemaInstance.valid) {
                let { serviceName, instanceId, index, etcdOptions, suffix } = schemaInstance.instance;
                let internalServiceName = serviceName ? serviceName : this.parent._serviceName
                let _path = path.join('/', PREFIX.SERVICES, internalServiceName, instanceId, suffix);
                this.parent.etcd.get(_path, etcdOptions, (err, obj) => {
                    if (err) {
                        return rej(err);
                    }
                    return res(obj);
                });
            } else {
                return rej(new Error(schemaInstance.errors[0].stack));
            }
        });
    }

    delete(options) {
        return new Promise((res, rej) => {
            const schemaInstance = this.getSchema(options, { ignoreNull: true });
            if (schemaInstance.valid) {
                let { serviceName, instanceId, etcdOptions, suffix } = schemaInstance.instance;
                let internalServiceName = serviceName ? serviceName : this.parent._serviceName
                let _path = path.join('/', PREFIX.SERVICES, internalServiceName, instanceId, suffix);
                this.parent.etcd.delete(_path, etcdOptions, (err, obj) => {
                    if (err) {
                        if (err.errorCode === 100) {
                            return res(null);
                        }
                        return rej(err);
                    }
                    return res(obj);
                });
            } else {
                return rej(new Error(schemaInstance.errors[0].stack));
            }
        });
    }
}

module.exports = services;