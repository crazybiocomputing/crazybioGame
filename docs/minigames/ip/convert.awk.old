BEGIN {
  titles_ip[1] = "Toolbar ... [ N E W   Feb 2013]";
  titles_ip[2] = "Colors ... [ U p d a t e d   Oct 2010]";
  titles_ip[3] = "Exploring ... [ U p d a t e d   Oct 2010]";
  titles_ip[4] = "One, two, three, four ...";
  titles_ip[5] = "1 + 1 + 1 + 1 + . . . . + 1 = ???? [N E W : Sept 2012]";
  titles_ip[6] = "AND, OR, XOR, + - * / ... [ U p d a t e d   Nov 2011]";
  titles_ip[7] =  "Morphology ... [ N E W   Feb 2013]";
  titles_ip[8] =  "Noise ... [ U p d a t e d March 2012]";
  titles_ip[9] =  "Fourier Space: The twilight zone ... [ U p d a t e d March 2012]";
  titles_ip[10] = "Lizards ...In preparation.";
  titles_ip[11] = "Import images, low level ...";
  titles_ip[12] = "Import images, low level ... [ E X P E R T]";
  titles_ip[13] = "Vectors, Points, Overlays, ROI Manager ...";
  titles_ip[14] = "Scripting ...";
  titles_ip[15] = "Segmentation ...";
  titles_ip[16] = "Segmentation ... [ E X P E R T]";
  titles_ip[17] = "Stacks ...";
  titles_ip[18] = "2,5D, 3D ...Level in preparation";
 
  titles_bio[1] = "Entry format -  ...";
  titles_bio[2] = "Databases -  ...";
  titles_bio[3] = "Data mining -  ...";
  titles_bio[4] = "Bread AND Cheese OR Dessert BUT NOT Ice cream  ...";
  titles_bio[5] = "Data mining: Experts only";
  titles_bio[6] = "3D Structure";
  titles_bio[7] = "Bioinformatics Tools";
  titles_bio[8] = "Using Tools";
  titles_bio[9] = "Dot plots";
  titles_bio[10] = "Alignements";
  titles_bio[11] = "Blaaaast";
  titles_bio[12] = "Proteomics";
  titles_bio[13] = "Phylogeny ...";
  titles_bio[14] = "Could you help me? ...";
  titles_bio[15] = "Happy sunday for 'Dee And Hey' ...";
  titles_bio[16] = "Project <i>'Notes'</i> ...";
  titles_bio[17] = "Multiple Alignment ...";
  titles_bio[18] = "Project ...";
  titles_bio[19] = "Project <i>'In your eyes only'</i> ...";
  
  
  level=1;
  print "[";
  print "  {";
  printf "    \"level\": %s,\n",$2;
  printf "    \"title\": \"%s\",\n",titles_bio[level];
  print "    \"history\": \"[updated May 2017]\",";
  print "    \"games\": [";
}
{
  if ($2 == level) {
    print "      {";
    printf "         \"id\": %d,\n",$1;
    printf "          \"path\": \"%s\"\n",substr($3,1,index($3, "/")-1);
    print "      },";
  }
  else {
    level = $2;
    print "    ]";
    print "  },";
    print "  {";
    printf "    \"level\": %s,\n",$2;
    printf "    \"title\": \"%s\",\n",titles_bio[level];
    print "    \"history\": \"[updated May 2017]\",";
    print "    \"games\": [";
    print "      {";
    printf "         \"id\": %d,\n",$1;
    printf "          \"path\": \"%s\"\n",substr($3,1,index($3, "/")-1);
    print "      },";
  }


}
END {
  print "    ]";
  print "  }";
  print "]";
}
