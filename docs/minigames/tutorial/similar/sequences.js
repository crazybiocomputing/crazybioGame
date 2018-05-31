var yes = [
  "1,2,3,4,5" ,"1,2,3,5,4" ,"4,1,2,3,5","5,1,2,3,4","4,5,1,2,3","5,4,1,2,3"
];

var choices = [
  "1,2,4,3,5" ,"1,2,4,5,3" ,"1,2,5,3,4" ,
  "1,2,5,4,3" ,"1,3,2,4,5" ,"1,3,2,5,4" ,"1,3,4,2,5" ,"1,3,4,5,2" ,
  "1,3,5,2,4" ,"1,3,5,4,2" ,"1,4,2,3,5" ,"1,4,2,5,3" ,"1,4,3,2,5" ,
  "1,4,3,5,2" ,"1,4,5,2,3" ,"1,4,5,3,2" ,"1,5,2,3,4" ,"1,5,2,4,3" ,
  "1,5,3,2,4" ,"1,5,3,4,2" ,"1,5,4,2,3" ,"1,5,4,3,2" ,"2,1,3,4,5" ,
  "2,1,3,5,4" ,"2,1,4,3,5" ,"2,1,4,5,3" ,"2,1,5,3,4" ,"2,1,5,4,3" ,
  "2,3,1,4,5" ,"2,3,1,5,4" ,"2,3,4,1,5" ,"2,3,4,5,1" ,"2,3,5,1,4" ,
  "2,3,5,4,1" ,"2,4,1,3,5" ,"2,4,1,5,3" ,"2,4,3,1,5" ,"2,4,3,5,1" ,
  "2,4,5,1,3" ,"2,4,5,3,1" ,"2,5,1,3,4" ,"2,5,1,4,3" ,"2,5,3,1,4" ,
  "2,5,3,4,1" ,"2,5,4,1,3" ,"2,5,4,3,1" ,"3,1,2,4,5" ,"3,1,2,5,4" ,
  "3,1,4,2,5" ,"3,1,4,5,2" ,"3,1,5,2,4" ,"3,1,5,4,2" ,"3,2,1,4,5" ,
  "3,2,1,5,4" ,"3,2,4,1,5" ,"3,2,4,5,1" ,"3,2,5,1,4" ,"3,2,5,4,1" ,
  "3,4,1,2,5" ,"3,4,1,5,2" ,"3,4,2,1,5" ,"3,4,2,5,1" ,"3,4,5,1,2" ,
  "3,4,5,2,1" ,"3,5,1,2,4" ,"3,5,1,4,2" ,"3,5,2,1,4" ,"3,5,2,4,1" ,
  "3,5,4,1,2" ,"3,5,4,2,1" ,"4,1,2,5,3" ,"4,1,3,2,5" ,
  "4,1,3,5,2" ,"4,1,5,2,3" ,"4,1,5,3,2" ,"4,2,1,3,5" ,"4,2,1,5,3" ,
  "4,2,3,1,5" ,"4,2,3,5,1" ,"4,2,5,1,3" ,"4,2,5,3,1" ,"4,3,1,2,5" ,
  "4,3,1,5,2" ,"4,3,2,1,5" ,"4,3,2,5,1" ,"4,3,5,1,2" ,"4,3,5,2,1" ,
  "4,5,1,3,2" ,"4,5,2,1,3" ,"4,5,2,3,1" ,"4,5,3,1,2" ,
  "4,5,3,2,1" ,"5,1,2,4,3" ,"5,1,3,2,4" ,"5,1,3,4,2" ,
  "5,1,4,2,3" ,"5,1,4,3,2" ,"5,2,1,3,4" ,"5,2,1,4,3" ,"5,2,3,1,4" ,
  "5,2,3,4,1" ,"5,2,4,1,3" ,"5,2,4,3,1" ,"5,3,1,2,4" ,"5,3,1,4,2" ,
  "5,3,2,1,4" ,"5,3,2,4,1" ,"5,3,4,1,2" ,"5,3,4,2,1" ,
  "5,4,1,3,2" ,"5,4,2,1,3" ,"5,4,2,3,1" ,"5,4,3,1,2" ,"5,4,3,2,1"
];

var species=[
  "Beginning of Database","Rattus norvegicus","Mus musculus","Homo sapiens","Sus scrofa","Canus lupus",
  "Equus caballus","Escherichia coli","Pseudomonas aeruginosa","Ailuropoda melanoleuca",
  "Panthera tigris","Acinonyx jubatus","Phocarctos hookeri","Ursus maritimus",
  "Felis catus","Orcinus orca","Delphinapterus leucas","Pongo abelii","Gorilla gorilla",
  "Pan troglodytes","Bos taurus","Giraffa camelopardalis","Hippopotamus amphibius",
  "Nanger granti","Bison bison","Ovis aries","Bubalus bubalis","Panthera pardus","Rhinoceros unicornis",
  "Loxodonta africana","Ochotona alpina","Brachylagus idahoensis","Lepus californicus",
  "Cryptomys bocagei","Fukomys damarensis","Oryctolagus cuniculus","Hystrix pumila","Phoenicopterus jamesi",
  "Thalassarche cauta","Balaeniceps rex","Gavia pacifica","Pygoscelis antarctica",
  "Columba livia","Didunculus strigirostris","Buteo jamaicensis","Accipiter striatus",
  "Aquila chrysaetos","Cathartes aura","Balearica regulorum","Crotalus basiliscus",
  "Daboia russelii","Python molurus","Aspidites melanocephalus"," Boa constrictor",
  "Sanzinia madagascariensis","End of Database", "Balaenoptera physalus"
];


var sequences = [];
var sequence_active = 1;

function createColors() {
  var str ='';
  // Calcul toutes les combinaisons
  var seq='';
  for (i=1; i<= 5; i++) {
    for (j=1; j<= 5; j++) {
        for (k=1; k<=5;k++) {
          for (m=1; m<=5;m++) {
            for (n=1; n<=5;n++) {
              seq = i+','+j+','+k+','+m+','+n;
              if ( (seq.match(/1/g) || []).length ==1
              &&   (seq.match(/2/g) || []).length ==1
              &&   (seq.match(/3/g) || []).length ==1
              &&   (seq.match(/4/g) || []).length ==1
              &&   (seq.match(/5/g) || []).length ==1 ) {
                console.log(seq);
            }
          }
        }
      }
    }
  }
}
