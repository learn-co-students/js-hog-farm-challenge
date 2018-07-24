class Hog {
  constructor(id, name, specialty, greased, medal, weight, img) {
      this.id = id
      this.name = name
      this.specialty = specialty
      this.greased = greased
      this.medal = medal
      this.weight = weight
      this.img = img
  }
  render() {
    return `<div class="hog-card" id="${this.id}"><h3>${this.name}</h3><p>Specialty: ${this.specialty}</p><p>Medal: ${this.medal}</p><p>Weight: ${this.weight}</p><img src="${this.img}"></img></div>`
  }
}