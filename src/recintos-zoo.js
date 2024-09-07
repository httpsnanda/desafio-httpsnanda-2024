class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: "savana", tamanhoTotal: 10, animais: [{ especie: "MACACO", quantidade: 3, tamanho: 1 }] },
        { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: [] },
        { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animais: [{ especie: "GAZELA", quantidade: 1, tamanho: 2 }] },
        { numero: 4, bioma: "rio", tamanhoTotal: 8, animais: [] },
        { numero: 5, bioma: "savana", tamanhoTotal: 9, animais: [{ especie: "LEAO", quantidade: 1, tamanho: 3 }] }
      ];
  
      this.animaisPermitidos = {
        "LEAO": { tamanho: 3, bioma: ["savana"], carnivoro: true },
        "LEOPARDO": { tamanho: 2, bioma: ["savana"], carnivoro: true },
        "CROCODILO": { tamanho: 3, bioma: ["rio"], carnivoro: true },
        "MACACO": { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
        "GAZELA": { tamanho: 2, bioma: ["savana"], carnivoro: false },
        "HIPOPOTAMO": { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
      };
    }
  
    analisaRecintos(especie, quantidade) {
      // Verificar se o animal é válido
      if (!this.animaisPermitidos[especie]) {
        return { erro: "Animal inválido" };
      }
  
      // Verificar se a quantidade é válida
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: "Quantidade inválida" };
      }
  
      const animalInfo = this.animaisPermitidos[especie];
      let recintosViaveis = [];
  
      // Iterar sobre os recintos para encontrar opções viáveis
      this.recintos.forEach(recinto => {
        let espacoOcupado = recinto.animais.reduce((total, animal) => total + (animal.quantidade * animal.tamanho), 0);
        let espacoExtra = recinto.animais.length > 0 ? 1 : 0;  // Espaço extra caso haja mais de uma espécie
        let espacoLivre = recinto.tamanhoTotal - espacoOcupado - espacoExtra;
  
        // Verificar se o bioma é compatível
        if (!animalInfo.bioma.includes(recinto.bioma)) {
          return;
        }
  
        // Verificar se o espaço é suficiente
        if (espacoLivre < animalInfo.tamanho * quantidade) {
          return;
        }
  
        // Regras específicas para animais carnívoros
        const carnivorosNoRecinto = recinto.animais.some(animal => this.animaisPermitidos[animal.especie].carnivoro);
        if (animalInfo.carnivoro) {
          if (carnivorosNoRecinto && recinto.animais[0].especie !== especie) {
            return;
          }
          if (!carnivorosNoRecinto && recinto.animais.length > 0) {
            return;
          }
        }
  
        // Regras específicas para hipopótamos
        if (especie === "HIPOPOTAMO") {
          if (recinto.bioma !== "savana e rio" && recinto.animais.length > 0) {
            return;
          }
        }
  
        // Regras para macacos
        if (especie === "MACACO" && recinto.animais.length === 0) {
          return;
        }
  
        // Adicionar o recinto viável à lista
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - animalInfo.tamanho * quantidade} total: ${recinto.tamanhoTotal})`);
      });
  
      // Retornar recintos viáveis ou erro se nenhum for encontrado
      if (recintosViaveis.length > 0) {
        return { recintosViaveis };
      } else {
        return { erro: "Não há recinto viável" };
      }
    }
  }
  
  export { RecintosZoo as RecintosZoo };

  new RecintosZoo().analisaRecintos('MACACO', 2);

{
    recintosViaveis: [
      "Recinto 1 (espaço livre: 5 total: 10)",
      "Recinto 2 (espaço livre: 3 total: 5)",
      "Recinto 3 (espaço livre: 2 total: 7)"
    ]
  }

  {
    erro: "Animal inválido"
  }
  