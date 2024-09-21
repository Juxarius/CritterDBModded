angular.module('myApp').factory("TextUtils", function() {

  const lowercaseTitleWords = ["a", "an", "the", "for", "and", "nor", "but", "or", "yet", "so", "at", "around", "by", "after", "along", "for", "from", "of", "on", "to", "with", "without"];

  class TextUtils {

    getCreatureNameAsProperNoun(creature) {
      if (!creature) return "";
      var nameIsProper = creature.flavor ? creature.flavor.nameIsProper : false;
      return this.getNameAsProperNoun(creature.name, nameIsProper);
    }

    getNameAsProperNoun(name, nameIsProper) {
      if(nameIsProper)
        return(name);
      else
        return("the " + name.toLowerCase());
    }

    getCreatureNameAsIt(creature) {
      if (!creature) return "";
      var nameIsProper = creature.flavor ? creature.flavor.nameIsProper : false;
      return this.getNameAsIt(creature.name, nameIsProper);
    }

    //not sure what to call this function, but it determines when to call
    //  a creature "it" or by its full name like "King George".
    getNameAsIt(name, nameIsProper) {
      if(nameIsProper)
        return(name);
      else
        return("it");
    }

    capitalizeFirstLetter(word) {
      const firstAlphabeticalCharIndex = word.search(/[A-Za-z]/);
      return word.slice(0,firstAlphabeticalCharIndex) + word.charAt(firstAlphabeticalCharIndex).toUpperCase() + word.slice(firstAlphabeticalCharIndex + 1);
    }

    getTitleCase(sentence) {
      var splitSentence = sentence.split(" ");
      for (var i = 0; i < splitSentence.length; i++) {
        if (!lowercaseTitleWords.includes(splitSentence[i].toLowerCase()) || i == 0 || i == splitSentence.length - 1 ) {
          splitSentence[i] = this.capitalizeFirstLetter(splitSentence[i]);
        } else {
          splitSentence[i] = splitSentence[i].toLowerCase();
        }
      }
      return splitSentence.join(" ");
    }

    getCommaSeparatedList(items) {
      return items.filter(item => item).join(", ");
    }

    getPossessive(name){
      if(name.toLowerCase() == "it")
        return (name + "s");
      else
        return (name + "'s");   //just keeping things simple
    }

    getOrdinal(num) {
      var suffix = ["th","st","nd","rd"];
      var v = num%100;
      return num+(suffix[(v-20)%10]||suffix[v]||suffix[0]);
    }
  }

  // Create and return a singleton
  const instance = new TextUtils();
  Object.freeze(instance);

  return instance;
});
