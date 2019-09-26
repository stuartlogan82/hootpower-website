import Configuration from './Configuration'

class RequestService {
  constructor() {
    this.config = new Configuration();
  }

  async retrieveItems() {
    return fetch(this.config.ITEM_COLLECTION_URL)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .then(json => {
        console.log("Retrieved items:");
        console.log(json);
        const items = [];
        const itemArray = json._embedded.collectionItems;
        for(var i = 0; i < itemArray.length; i++) {
          itemArray[i]["link"] =  itemArray[i]._links.self.href;
          items.push(itemArray[i]);
        }
        return items;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  async getCustomer(parameter) {
    let url = this.config.DOMAIN + this.config.GET_CUSTOMER + "?phNumber=" + parameter;
    return this.getItem(url, parameter);
  }

  async getAccount(parameter) {
    let url = this.config.DOMAIN + this.config.GET_ACCOUNT + "?accountid=" + parameter;
    return this.getItem(url, parameter);
  }

  async getEmployee(parameter) {
    let url = this.config.DOMAIN + this.config.GET_EMPLOYEE + "?employeeId=" + parameter;
    return this.getItem(url, parameter);
  }

  async getJob(parameter) {
    let url = this.config.DOMAIN + this.config.GET_JOB + "?jobId=" + parameter;
    return this.getItem(url, parameter);
  }

  async getReading(parameter) {
    let url = this.config.DOMAIN + this.config.GET_READING + "?meterid=" + parameter;
    return this.getItem(url, parameter);
  }

  async getItem(url, parameter) {
    console.log("RequestService.getItem():");
    console.log("Item: " + parameter);
    return fetch(url)
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  async createCustomer(customer) {
    let url = this.config.DOMAIN + this.config.POST_CUSTOMER;
    this.createItem(url, customer)
  }

  async createJob(job) {
    let url = this.config.DOMAIN + this.config.POST_JOB;
    this.createItem(url, job)
  }

  async createReading(reading) {
    let url = this.config.DOMAIN + this.config.POST_READING;
    this.createItem(url, reading)
  }

  async createItem(url, newitem) {
    console.log("RequestService.createItem():");
    console.log(newitem);
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(newitem)
    })
      .then(response => {
       if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  async updateCustomer(customer) {
    let url = this.config.DOMAIN + this.config.UPDATE_CUSTOMER;
    this.updateItem(url, customer)
  }

  async updateJob(job) {
    let url = this.config.DOMAIN + this.config.UPDATE_JOB;
    this.updateItem(url, job)
  }

  async updateItem(url, item) {
    console.log("RequestService.updateItem():");
    console.log(item);
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
            "Content-Type": "application/json"
          },
      body: JSON.stringify(item)
    })
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  async deleteItem(itemlink) {
    console.log("RequestService.deleteItem():");
    console.log("item: " + itemlink);
    return fetch(itemlink, {
      method: "DELETE",
      mode: "cors"
    })
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  handleResponseError(response) {
      throw new Error("HTTP error, status = " + response.status);
  }

  handleError(error) {
      console.log(error.message);
      return Promise.resolve({})
  }
}
export default RequestService;