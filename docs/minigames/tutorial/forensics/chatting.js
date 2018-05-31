var dialog = {
  '000' : {
    'ID'         : '000',
    'element'    : 'chat',
    'people'     : 'girl',
    'html'       :  '<p>Bonjour, je m\'appelle Clara et je suis scientifique au <i>CrazyTown Police Departement</i>. Je vois que tu as ramené plusieurs échantillons... Puis-je t\'aider?</p>__button__',
    'widgets'     : [
      {
        'event'   : 'onclick',
        'type'    : 'button',
        'title'   : 'Next',
        'trigger' : 'set 00A'
      }
    ],
  },
  '00A' : {
    'ID'         : '00A',
    'element'    : 'chat',
    'people'     : 'girl',
    'html'     :
    'La première étape est d\'extraire l\'ADN contenu dans les échantillons, puis...</p>__button__',
    'widgets': [
      {
        'event'   : 'onclick',
        'type'    : 'button',
        'title'   : 'Next',
        'trigger' : 'set 00B'
      },
    ],
  },
  '00B' : {
    'ID'         : '00B',
    'element'    : 'chat',
    'people'     : 'girl',
    'html'     :
    '<p>... je dois séquencer cet ADN. Seulement, je ne vais pas séquencer tout l\'ADN, je vais me focaliser sur un tout petit morceau...</p>__button__',
    'widgets': [
      {
        'event'   : 'onclick',
        'type'    : 'button',
        'title'   : 'Next',
        'trigger' : 'set 00C'
      }
    ],
  },
  '00C' : {
    'ID'         : '00C',
    'element'    : 'chat',
    'people'     : 'girl',
    'html'     :
    '<p>... un gène particulier spécifique de chaque espèce du monde du vivant qui se trouve dans l\'ADN des mitochondries...</p>__button__',
    'widgets': [
      {
        'event'   : 'onclick',
        'type'    : 'button',
        'title'   : 'Next',
        'trigger' : 'set 00D'
      }
    ],
  },
  '00D' : {
    'ID'         : '00D',
    'element'    : 'chat',
    'people'     : 'girl',
    'html'     :
    '<p>... Ce gène appelé <abbr title="Cytochrome Oxydase">COI</abbr> doit être amplifié par <abbr title="Polymerase Chain Reaction">PCR</abbr> avant d\'être séquencé ...  </p>__button__',
    'widgets': [
      {
        'event'   : 'onclick',
        'type'    : 'button',
        'title'   : 'Next',
        'trigger' : 'set 01E'

      }
    ],
  },
  '01E' : {
    'ID'         : '01E',
    'element'    : 'chat',
    'people'     : 'girl',
    'html'     :
    '<p>... Cette petite  <a href="javascript:void(0)" onclick="showVideo()"> vidéo</a> te montre comment on produit le gène qui nous intéresse avec deux <b>amorces</b> &mdash;petits morceaux d\'ADN encadrant le gène&mdash;...</p>__button__',
    'widgets': [
      {
        'event'   : 'onclick',
        'type'    : 'button',
        'title'   : 'Next',
        'trigger' : 'set 00E'
      }
    ],
  },
  '00E' : {
    'ID'         : '00E',
    'element'    : 'chat',
    'people'     : 'girl',
    'html'     :
    '<p>... Enfin, une fois en quantité suffisante, on peut séquencer le gène par la méthode de Sanger c\'est à dire "lire" chacun des nucléotides qui compose ce gène ... </p>__button__',
    'widgets': [
      {
        'event'   : 'onclick',
        'type'    : 'button',
        'title'   : 'Next',
        'trigger' : 'set 02F'
      }
    ],
  },
  '02F' : {
    'ID'         : '02F',
    'element'    : 'chat',
    'people'     : 'girl',
    'html'     :
    '<p>...Voici La séquence de l\'échantillon A:<pre style="font-size:10px">&gt; Echantillon #A\n'+
'AATCGGAGATGACCAAGTCTACAACGTATTAGTAACAGCCCACGCCTTCGTGATAATCTTCTTCATAGTT\n'+
'ATACCTATTATAATCGGCGGATTCGGAAATTGACTGGTCCCTCTAATGATTGGAGCACCCGACATAGCCT\n'+
'TCCCTCGTATAAATAACATAAGCTTCTGACTACTCCCTCCTTCCTTCCTACTCTTAATAGCATCCTCAAT </pre> </p>__button__',
    'widgets': [
      {
        'event'   : 'onclick',
        'type'    : 'button',
        'title'   : 'Next',
        'trigger' : 'set 01F'
      }
    ],
  },
  '01F' : {
    'ID'         : '01F',
    'element'    : 'chat',
    'people'     : 'girl',
    'html'     :
    '<p>...Pendant que je m\'occupe des autres échantillons, il est temps  de trouver à quel animal appartient cette séquence...Va voir <a href="seq.php">Jason</a> ...</p>',
    'widgets': [
      {
        'event'   : 'onclick',
        'type'    : 'button',
        'title'   : 'Next',
        'trigger' : 'set 00F'
      }
    ],
  },
};
