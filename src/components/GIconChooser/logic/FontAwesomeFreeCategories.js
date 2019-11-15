// Code to extract data from fontawesome:
// Step 1: F12 -> Console -> Enter code:  Array.from($x("//section[@id='results-icons']/ul/li/div/div/span/text()")).map(i => i.data).join(',')
// Step 2: Copy output
// Step 3: Paste in here

function createUniqueIconArr(str) {
  let arr = str.split(',')
  let  output = []
  _.each(arr, iconName => (output.indexOf(iconName) < 0) && output.push(iconName))
  return output
}

export default [
  {
    name: 'Accessibility',
    icons: createUniqueIconArr('accessible-icon,american-sign-language-interpreting,assistive-listening-systems,audio-description,blind,braille,closed-captioning,deaf,low-vision,phone-volume,question-circle,question-circle,sign-language,tty,universal-access,wheelchair')
  },
  {
    name: 'Alert',
    icons: createUniqueIconArr('bell,bell-slash,exclamation,exclamation-circle,exclamation-triangle,radiation,radiation-alt,skull-crossbones')
  },
  {
    name: 'Animals',
    icons: createUniqueIconArr('cat,crow,dog,dove,dragon,feather,feather-alt,fish,frog,hippo,horse,horse-head,kiwi-bird,otter,paw,spider')
  },
  {
    name: 'Arrow',
    icons: createUniqueIconArr('angle-double-down,angle-double-left,angle-double-right,angle-double-up,angle-down,angle-left,angle-right,angle-up,arrow-alt-circle-down,arrow-alt-circle-down,arrow-alt-circle-left,arrow-alt-circle-left,arrow-alt-circle-right,arrow-alt-circle-right,arrow-alt-circle-up,arrow-alt-circle-up,arrow-circle-down,arrow-circle-left,arrow-circle-right,arrow-circle-up,arrow-down,arrow-left,arrow-right,arrow-up,arrows-alt,arrows-alt-h,arrows-alt-v,caret-down,caret-left,caret-right,caret-square-down,caret-square-down,caret-square-left,caret-square-left,caret-square-right,caret-square-right,caret-square-up,caret-square-up,caret-up,cart-arrow-down,chart-line,chevron-circle-down,chevron-circle-left,chevron-circle-right,chevron-circle-up,chevron-down,chevron-left,chevron-right,chevron-up,cloud-download-alt,cloud-upload-alt,compress-arrows-alt,download,exchange-alt,expand-arrows-alt,external-link-alt,external-link-square-alt,hand-point-down,hand-point-down,hand-point-left,hand-point-left,hand-point-right,hand-point-right,hand-point-up,hand-point-up,hand-pointer,hand-pointer,history,level-down-alt,level-up-alt,location-arrow,long-arrow-alt-down,long-arrow-alt-left,long-arrow-alt-right,long-arrow-alt-up,mouse-pointer,play,random,recycle,redo,redo-alt,reply,reply-all,retweet,share,share-square,share-square,sign-in-alt,sign-out-alt,sort,sort-alpha-down,sort-alpha-down-alt,sort-alpha-up,sort-alpha-up-alt,sort-amount-down,sort-amount-down-alt,sort-amount-up,sort-amount-up-alt,sort-down,sort-numeric-down,sort-numeric-down-alt,sort-numeric-up,sort-numeric-up-alt,sort-up,sync,sync-alt,text-height,text-width,undo,undo-alt,upload')
  },
  {
    name: 'Audio & Video',
    icons: createUniqueIconArr('audio-description,backward,broadcast-tower,circle,circle,closed-captioning,compress,compress-arrows-alt,eject,expand,expand-arrows-alt,fast-backward,fast-forward,file-audio,file-audio,file-video,file-video,film,forward,headphones,microphone,microphone-alt,microphone-alt-slash,microphone-slash,music,pause,pause-circle,pause-circle,phone-volume,photo-video,play,play-circle,play-circle,podcast,random,redo,redo-alt,rss,rss-square,step-backward,step-forward,stop,stop-circle,stop-circle,sync,sync-alt,tv,undo,undo-alt,video,volume-down,volume-mute,volume-off,volume-up,youtube')
  },
  {
    name: 'Automotive',
    icons: createUniqueIconArr('air-freshener,ambulance,bus,bus-alt,car,car-alt,car-battery,car-crash,car-side,charging-station,gas-pump,motorcycle,oil-can,shuttle-van,tachometer-alt,taxi,truck,truck-monster,truck-pickup')
  },
  {
    name: 'Autumn',
    icons: createUniqueIconArr('apple-alt,campground,cloud-sun,drumstick-bite,football-ball,hiking,mountain,tractor,tree,wind,wine-bottle')
  },
  {
    name: 'Beverage',
    icons: createUniqueIconArr('beer,blender,cocktail,coffee,flask,glass-cheers,glass-martini,glass-martini-alt,glass-whiskey,mug-hot,wine-bottle,wine-glass,wine-glass-alt')
  },
  {
    name: 'Buildings',
    icons: createUniqueIconArr('archway,building,campground,church,city,clinic-medical,dungeon,gopuram,home,hospital,hospital-alt,hotel,house-damage,igloo,industry,kaaba,landmark,monument,mosque,place-of-worship,school,store,store-alt,synagogue,torii-gate,university,vihara,warehouse')
  },
  {
    name: 'Business',
    icons: createUniqueIconArr('address-book,address-book,address-card,address-card,archive,balance-scale,balance-scale-left,balance-scale-right,birthday-cake,book,briefcase,building,building,bullhorn,bullseye,business-time,calculator,calendar,calendar,calendar-alt,calendar-alt,certificate,chart-area,chart-bar,chart-bar,chart-line,chart-pie,city,clipboard,clipboard,coffee,columns,compass,compass,copy,copy,copyright,copyright,cut,edit,edit,envelope,envelope,envelope-open,envelope-open,envelope-square,eraser,fax,file,file,file-alt,file-alt,folder,folder,folder-minus,folder-open,folder-open,folder-plus,glasses,globe,highlighter,industry,landmark,marker,paperclip,paste,pen,pen-alt,pen-fancy,pen-nib,pen-square,pencil-alt,percent,phone,phone-alt,phone-slash,phone-square,phone-square-alt,phone-volume,print,project-diagram,registered,registered,save,save,sitemap,socks,sticky-note,sticky-note,stream,table,tag,tags,tasks,thumbtack,trademark,wallet')
  },
  {
    name: 'Camping',
    icons: createUniqueIconArr('binoculars,campground,compass,compass,fire,fire-alt,first-aid,frog,hiking,map,map,map-marked,map-marked-alt,map-signs,mountain,route,toilet-paper,tree"')
  },
  {
    name: 'Charity',
    icons: createUniqueIconArr('dollar-sign,donate,dove,gift,globe,hand-holding-heart,hand-holding-usd,hands-helping,handshake,handshake,heart,heart,leaf,parachute-box,piggy-bank,ribbon,seedling')
  },
  {
    name: 'Chat',
    icons: createUniqueIconArr('comment,comment,comment-alt,comment-alt,comment-dots,comment-dots,comment-medical,comment-slash,comments,comments,frown,frown,icons,meh,meh,phone,phone-alt,phone-slash,poo,quote-left,quote-right,smile,smile,sms,video,video-slash')
  },
  {
    name: 'Chess',
    icons: createUniqueIconArr('chess,chess-bishop,chess-board,chess-king,chess-knight,chess-pawn,chess-queen,chess-rook,square-full')
  },
  {
    name: 'Childhood',
    icons: createUniqueIconArr('apple-alt,baby,baby-carriage,bath,biking,birthday-cake,cookie,cookie-bite,gamepad,ice-cream,mitten,robot,school,shapes,snowman')
  },
  {
    name: 'Clothing',
    icons: createUniqueIconArr('graduation-cap,hat-cowboy,hat-cowboy-side,hat-wizard,mitten,shoe-prints,socks,tshirt,user-tie')
  },
  {
    name: 'Code',
    icons: createUniqueIconArr('archive,barcode,bath,bug,code,code-branch,coffee,file,file,file-alt,file-alt,file-code,file-code,filter,fire-extinguisher,folder,folder,folder-open,folder-open,keyboard,keyboard,laptop-code,microchip,project-diagram,qrcode,shield-alt,sitemap,stream,terminal,user-secret,window-close,window-close,window-maximize,window-maximize,window-minimize,window-minimize,window-restore,window-restore')
  },
  {
    name: 'Communication',
    icons: createUniqueIconArr('address-book,address-book,address-card,address-card,american-sign-language-interpreting,assistive-listening-systems,at,bell,bell,bell-slash,bell-slash,bluetooth,bluetooth-b,broadcast-tower,bullhorn,chalkboard,comment,comment,comment-alt,comment-alt,comments,comments,envelope,envelope,envelope-open,envelope-open,envelope-square,fax,inbox,language,microphone,microphone-alt,microphone-alt-slash,microphone-slash,mobile,mobile-alt,paper-plane,paper-plane,phone,phone-alt,phone-slash,phone-square,phone-square-alt,phone-volume,rss,rss-square,tty,voicemail,wifi')
  },
  {
    name: 'Computers',
    icons: createUniqueIconArr('database,desktop,download,ethernet,hdd,hdd,headphones,keyboard,keyboard,laptop,memory,microchip,mobile,mobile-alt,mouse,plug,power-off,print,satellite,satellite-dish,save,save,sd-card,server,sim-card,stream,tablet,tablet-alt,tv,upload')
  },
  {
    name: 'Construction',
    icons: createUniqueIconArr('brush,drafting-compass,dumpster,hammer,hard-hat,paint-roller,pencil-alt,pencil-ruler,ruler,ruler-combined,ruler-horizontal,ruler-vertical,screwdriver,toolbox,tools,truck-pickup,wrench')
  },
  {
    name: 'Currency',
    icons: createUniqueIconArr('bitcoin,btc,dollar-sign,ethereum,euro-sign,gg,gg-circle,hryvnia,lira-sign,money-bill,money-bill-alt,money-bill-alt,money-bill-wave,money-bill-wave-alt,money-check,money-check-alt,pound-sign,ruble-sign,rupee-sign,shekel-sign,tenge,won-sign,yen-sign')
  },
  {
    name: 'Date & Time',
    icons: createUniqueIconArr('bell,bell,bell-slash,bell-slash,calendar,calendar,calendar-alt,calendar-alt,calendar-check,calendar-check,calendar-minus,calendar-minus,calendar-plus,calendar-plus,calendar-times,calendar-times,clock,clock,hourglass,hourglass,hourglass-end,hourglass-half,hourglass-start,stopwatch')
  },
  {
    name: 'Design',
    icons: createUniqueIconArr('adjust,bezier-curve,brush,clone,clone,copy,copy,crop,crop-alt,crosshairs,cut,drafting-compass,draw-polygon,edit,edit,eraser,eye,eye,eye-dropper,eye-slash,eye-slash,fill,fill-drip,highlighter,icons,layer-group,magic,marker,object-group,object-group,object-ungroup,object-ungroup,paint-brush,paint-roller,palette,paste,pen,pen-alt,pen-fancy,pen-nib,pencil-alt,pencil-ruler,ruler-combined,ruler-horizontal,ruler-vertical,save,save,splotch,spray-can,stamp,swatchbook,tint,tint-slash,vector-square')
  },
  {
    name: 'Editors',
    icons: createUniqueIconArr('align-center,align-justify,align-left,align-right,bold,border-all,border-none,border-style,clipboard,clipboard,clone,clone,columns,copy,copy,cut,edit,edit,eraser,file,file,file-alt,file-alt,font,glasses,heading,highlighter,i-cursor,icons,indent,italic,link,list,list-alt,list-alt,list-ol,list-ul,marker,outdent,paper-plane,paper-plane,paperclip,paragraph,paste,pen,pen-alt,pen-fancy,pen-nib,pencil-alt,print,quote-left,quote-right,redo,redo-alt,remove-format,reply,reply-all,screwdriver,share,spell-check,strikethrough,subscript,superscript,sync,sync-alt,table,tasks,text-height,text-width,th,th-large,th-list,tools,trash,trash-alt,trash-alt,trash-restore,trash-restore-alt,underline,undo,undo-alt,unlink,wrench')
  },
  {
    name: 'Education',
    icons: createUniqueIconArr('apple-alt,atom,award,bell,bell,bell-slash,bell-slash,book-open,book-reader,chalkboard,chalkboard-teacher,graduation-cap,laptop-code,microscope,music,school,shapes,theater-masks,user-graduate')
  },
  {
    name: 'Emoji',
    icons: createUniqueIconArr('angry,angry,dizzy,dizzy,flushed,flushed,frown,frown,frown-open,frown-open,grimace,grimace,grin,grin,grin-alt,grin-alt,grin-beam,grin-beam,grin-beam-sweat,grin-beam-sweat,grin-hearts,grin-hearts,grin-squint,grin-squint,grin-squint-tears,grin-squint-tears,grin-stars,grin-stars,grin-tears,grin-tears,grin-tongue,grin-tongue,grin-tongue-squint,grin-tongue-squint,grin-tongue-wink,grin-tongue-wink,grin-wink,grin-wink,kiss,kiss,kiss-beam,kiss-beam,kiss-wink-heart,kiss-wink-heart,laugh,laugh,laugh-beam,laugh-beam,laugh-squint,laugh-squint,laugh-wink,laugh-wink,meh,meh,meh-blank,meh-blank,meh-rolling-eyes,meh-rolling-eyes,sad-cry,sad-cry,sad-tear,sad-tear,smile,smile,smile-beam,smile-beam,smile-wink,smile-wink,surprise,surprise,tired,tired')
  },
  {
    name: 'Energy',
    icons: createUniqueIconArr('atom,battery-empty,battery-full,battery-half,battery-quarter,battery-three-quarters,broadcast-tower,burn,charging-station,fire,fire-alt,gas-pump,industry,leaf,lightbulb,lightbulb,plug,poop,power-off,radiation,radiation-alt,seedling,solar-panel,sun,sun,water,wind')
  },{
    name: 'Files',
    icons: createUniqueIconArr('archive,clone,clone,copy,copy,cut,file,file,file-alt,file-alt,file-archive,file-archive,file-audio,file-audio,file-code,file-code,file-excel,file-excel,file-image,file-image,file-pdf,file-pdf,file-powerpoint,file-powerpoint,file-video,file-video,file-word,file-word,folder,folder,folder-open,folder-open,paste,photo-video,save,save,sticky-note,sticky-note')
  },
  {
    name: 'Finance',
    icons: createUniqueIconArr('balance-scale,balance-scale-left,balance-scale-right,book,cash-register,chart-line,chart-pie,coins,comment-dollar,comments-dollar,credit-card,credit-card,donate,file-invoice,file-invoice-dollar,hand-holding-usd,landmark,money-bill,money-bill-alt,money-bill-alt,money-bill-wave,money-bill-wave-alt,money-check,money-check-alt,percentage,piggy-bank,receipt,stamp,wallet"')
  },
  {
    name: 'Fitness',
    icons: createUniqueIconArr('bicycle,biking,burn,fire-alt,heart,heart,heartbeat,hiking,running,shoe-prints,skating,skiing,skiing-nordic,snowboarding,spa,swimmer,walking')
  },
  {
    name: 'Food',
    icons: createUniqueIconArr('apple-alt,bacon,bone,bread-slice,candy-cane,carrot,cheese,cloud-meatball,cookie,drumstick-bite,egg,fish,hamburger,hotdog,ice-cream,lemon,lemon,pepper-hot,pizza-slice,seedling,stroopwafel')
  },
  {
    name: 'Fruits & Vegetables',
    icons: createUniqueIconArr('apple-alt,carrot,leaf,lemon,lemon,pepper-hot,seedling')
  },
  {
    name: 'Games',
    icons: createUniqueIconArr('chess,chess-bishop,chess-board,chess-king,chess-knight,chess-pawn,chess-queen,chess-rook,dice,dice-d20,dice-d6,dice-five,dice-four,dice-one,dice-six,dice-three,dice-two,gamepad,ghost,headset,heart,heart,playstation,puzzle-piece,steam,steam-square,steam-symbol,twitch,xbox')
  },
  {
    name: 'Genders',
    icons: createUniqueIconArr('genderless,mars,mars-double,mars-stroke,mars-stroke-h,mars-stroke-v,mercury,neuter,transgender,transgender-alt,venus,venus-double,venus-mars')
  },
  {
    name: 'Halloween',
    icons: createUniqueIconArr('book-dead,broom,cat,cloud-moon,crow,ghost,hat-wizard,mask,skull-crossbones,spider,toilet-paper')
  },
  {
    name: 'Hands',
    icons: createUniqueIconArr('allergies,fist-raised,hand-holding,hand-holding-heart,hand-holding-usd,hand-lizard,hand-lizard,hand-middle-finger,hand-paper,hand-paper,hand-peace,hand-peace,hand-point-down,hand-point-down,hand-point-left,hand-point-left,hand-point-right,hand-point-right,hand-point-up,hand-point-up,hand-pointer,hand-pointer,hand-rock,hand-rock,hand-scissors,hand-scissors,hand-spock,hand-spock,hands,hands-helping,handshake,handshake,praying-hands,thumbs-down,thumbs-down,thumbs-up,thumbs-up')
  },
  {
    name: 'Health',
    icons: createUniqueIconArr('accessible-icon,ambulance,h-square,heart,heart,heartbeat,hospital,hospital,medkit,plus-square,plus-square,prescription,stethoscope,user-md,wheelchair')
  },
  {
    name: 'Holiday',
    icons: createUniqueIconArr('candy-cane,carrot,cookie-bite,gift,gifts,glass-cheers,holly-berry,mug-hot,sleigh,snowman')
  },
  {
    name: 'Hotel',
    icons: createUniqueIconArr('baby-carriage,bath,bed,briefcase,car,cocktail,coffee,concierge-bell,dice,dice-five,door-closed,door-open,dumbbell,glass-martini,glass-martini-alt,hot-tub,hotel,infinity,key,luggage-cart,shower,shuttle-van,smoking,smoking-ban,snowflake,snowflake,spa,suitcase,suitcase-rolling,swimmer,swimming-pool,tv,umbrella-beach,utensils,wheelchair,wifi')
  },
  {
    name: 'Household',
    icons: createUniqueIconArr('bath,bed,blender,chair,couch,door-closed,door-open,dungeon,fan,shower,toilet-paper,tv"')
  },
  {
    name: 'Images',
    icons: createUniqueIconArr('adjust,bolt,camera,camera-retro,chalkboard,clone,clone,compress,compress-arrows-alt,expand,eye,eye,eye-dropper,eye-slash,eye-slash,file-image,file-image,film,id-badge,id-badge,id-card,id-card,image,image,images,images,photo-video,portrait,sliders-h,tint')
  },
  {
    name: 'Interfaces',
    icons: createUniqueIconArr('award,ban,barcode,bars,beer,bell,bell,bell-slash,bell-slash,blog,bug,bullhorn,bullseye,calculator,calendar,calendar,calendar-alt,calendar-alt,calendar-check,calendar-check,calendar-minus,calendar-minus,calendar-plus,calendar-plus,calendar-times,calendar-times,certificate,check,check-circle,check-circle,check-double,check-square,check-square,circle,circle,clipboard,clipboard,clone,clone,cloud,cloud-download-alt,cloud-upload-alt,coffee,cog,cogs,copy,copy,cut,database,dot-circle,dot-circle,download,edit,edit,ellipsis-h,ellipsis-v,envelope,envelope,envelope-open,envelope-open,eraser,exclamation,exclamation-circle,exclamation-triangle,external-link-alt,external-link-square-alt,eye,eye,eye-slash,eye-slash,file,file,file-alt,file-alt,file-download,file-export,file-import,file-upload,filter,fingerprint,flag,flag,flag-checkered,folder,folder,folder-open,folder-open,frown,frown,glasses,grip-horizontal,grip-lines,grip-lines-vertical,grip-vertical,hashtag,heart,heart,history,home,i-cursor,info,info-circle,language,magic,marker,medal,meh,meh,microphone,microphone-alt,microphone-slash,minus,minus-circle,minus-square,minus-square,paste,pen,pen-alt,pen-fancy,pencil-alt,plus,plus-circle,plus-square,plus-square,poo,qrcode,question,question-circle,question-circle,quote-left,quote-right,redo,redo-alt,reply,reply-all,rss,rss-square,save,save,screwdriver,search,search-minus,search-plus,share,share-alt,share-alt-square,share-square,share-square,shield-alt,sign-in-alt,sign-out-alt,signal,sitemap,sliders-h,smile,smile,sort,sort-alpha-down,sort-alpha-down-alt,sort-alpha-up,sort-alpha-up-alt,sort-amount-down,sort-amount-down-alt,sort-amount-up,sort-amount-up-alt,sort-down,sort-numeric-down,sort-numeric-down-alt,sort-numeric-up,sort-numeric-up-alt,sort-up,star,star,star-half,star-half,sync,sync-alt,thumbs-down,thumbs-down,thumbs-up,thumbs-up,times,times-circle,times-circle,toggle-off,toggle-on,tools,trash,trash-alt,trash-alt,trash-restore,trash-restore-alt,trophy,undo,undo-alt,upload,user,user,user-alt,user-circle,user-circle,volume-down,volume-mute,volume-off,volume-up,wifi,wrench')
  },
  {
    name: 'Logistics',
    icons: createUniqueIconArr('box,boxes,clipboard-check,clipboard-list,dolly,dolly-flatbed,hard-hat,pallet,shipping-fast,truck,warehouse')
  },
  {
    name: 'Maps',
    icons: createUniqueIconArr('ambulance,anchor,balance-scale,balance-scale-left,balance-scale-right,bath,bed,beer,bell,bell,bell-slash,bell-slash,bicycle,binoculars,birthday-cake,blind,bomb,book,bookmark,bookmark,briefcase,building,building,car,coffee,crosshairs,directions,dollar-sign,draw-polygon,eye,eye,eye-slash,eye-slash,fighter-jet,fire,fire-alt,fire-extinguisher,flag,flag,flag-checkered,flask,gamepad,gavel,gift,glass-martini,globe,graduation-cap,h-square,heart,heart,heartbeat,helicopter,home,hospital,hospital,image,image,images,images,industry,info,info-circle,key,landmark,layer-group,leaf,lemon,lemon,life-ring,life-ring,lightbulb,lightbulb,location-arrow,low-vision,magnet,male,map,map,map-marker,map-marker-alt,map-pin,map-signs,medkit,money-bill,money-bill-alt,money-bill-alt,motorcycle,music,newspaper,newspaper,parking,paw,phone,phone-alt,phone-square,phone-square-alt,phone-volume,plane,plug,plus,plus-square,plus-square,print,recycle,restroom,road,rocket,route,search,search-minus,search-plus,ship,shoe-prints,shopping-bag,shopping-basket,shopping-cart,shower,snowplow,street-view,subway,suitcase,tag,tags,taxi,thumbtack,ticket-alt,tint,traffic-light,train,tram,tree,trophy,truck,tty,umbrella,university,utensil-spoon,utensils,wheelchair,wifi,wine-glass,wrench')
  },
  {
    name: 'Maritime',
    icons: createUniqueIconArr('anchor,binoculars,compass,compass,dharmachakra,frog,ship,skull-crossbones,swimmer,water,wind')
  },
  {
    name: 'Marketing',
    icons: createUniqueIconArr('ad,bullhorn,bullseye,comment-dollar,comments-dollar,envelope-open-text,funnel-dollar,lightbulb,lightbulb,mail-bulk,poll,poll-h,search-dollar,search-location')
  },
  {
    name: 'Mathematics',
    icons: createUniqueIconArr('calculator,divide,equals,greater-than,greater-than-equal,infinity,less-than,less-than-equal,minus,not-equal,percentage,plus,square-root-alt,subscript,superscript,times,wave-square')
  },
  {
    name: 'Medical',
    icons: createUniqueIconArr('allergies,ambulance,band-aid,biohazard,bone,bong,book-medical,brain,briefcase-medical,burn,cannabis,capsules,clinic-medical,comment-medical,crutch,diagnoses,dna,file-medical,file-medical-alt,file-prescription,first-aid,heart,heart,heartbeat,hospital,hospital,hospital-alt,hospital-symbol,id-card-alt,joint,laptop-medical,microscope,mortar-pestle,notes-medical,pager,pills,plus,poop,prescription,prescription-bottle,prescription-bottle-alt,procedures,radiation,radiation-alt,smoking,smoking-ban,star-of-life,stethoscope,syringe,tablets,teeth,teeth-open,thermometer,tooth,user-md,user-nurse,vial,vials,weight,x-ray')
  },
  {
    name: 'Moving',
    icons: createUniqueIconArr('archive,box-open,couch,dolly,people-carry,route,sign,suitcase,tape,truck-loading,truck-moving,wine-glass')
  },
  {
    name: 'Music',
    icons: createUniqueIconArr('drum,drum-steelpan,file-audio,file-audio,guitar,headphones,headphones-alt,microphone,microphone-alt,microphone-alt-slash,microphone-slash,music,napster,play,record-vinyl,sliders-h,soundcloud,spotify,volume-down,volume-mute,volume-off,volume-up')
  },
  {
    name: 'Objects',
    icons: createUniqueIconArr('ambulance,anchor,archive,award,baby-carriage,balance-scale,balance-scale-left,balance-scale-right,bath,bed,beer,bell,bell,bicycle,binoculars,birthday-cake,blender,bomb,book,book-dead,bookmark,bookmark,briefcase,broadcast-tower,bug,building,building,bullhorn,bullseye,bus,calculator,calendar,calendar,calendar-alt,calendar-alt,camera,camera-retro,candy-cane,car,carrot,church,clipboard,clipboard,cloud,coffee,cog,cogs,compass,compass,cookie,cookie-bite,copy,copy,cube,cubes,cut,dice,dice-d20,dice-d6,dice-five,dice-four,dice-one,dice-six,dice-three,dice-two,digital-tachograph,door-closed,door-open,drum,drum-steelpan,envelope,envelope,envelope-open,envelope-open,eraser,eye,eye,eye-dropper,fax,feather,feather-alt,fighter-jet,file,file,file-alt,file-alt,file-prescription,film,fire,fire-alt,fire-extinguisher,flag,flag,flag-checkered,flask,futbol,futbol,gamepad,gavel,gem,gem,gift,gifts,glass-cheers,glass-martini,glass-whiskey,glasses,globe,graduation-cap,guitar,hat-wizard,hdd,hdd,headphones,headphones-alt,headset,heart,heart,heart-broken,helicopter,highlighter,holly-berry,home,hospital,hospital,hourglass,hourglass,igloo,image,image,images,images,industry,key,keyboard,keyboard,laptop,leaf,lemon,lemon,life-ring,life-ring,lightbulb,lightbulb,lock,lock-open,magic,magnet,map,map,map-marker,map-marker-alt,map-pin,map-signs,marker,medal,medkit,memory,microchip,microphone,microphone-alt,mitten,mobile,mobile-alt,money-bill,money-bill-alt,money-bill-alt,money-check,money-check-alt,moon,moon,motorcycle,mug-hot,newspaper,newspaper,paint-brush,paper-plane,paper-plane,paperclip,paste,paw,pen,pen-alt,pen-fancy,pen-nib,pencil-alt,phone,phone-alt,plane,plug,print,puzzle-piece,ring,road,rocket,ruler-combined,ruler-horizontal,ruler-vertical,satellite,satellite-dish,save,save,school,screwdriver,scroll,sd-card,search,shield-alt,shopping-bag,shopping-basket,shopping-cart,shower,sim-card,skull-crossbones,sleigh,snowflake,snowflake,snowplow,space-shuttle,star,star,sticky-note,sticky-note,stopwatch,stroopwafel,subway,suitcase,sun,sun,tablet,tablet-alt,tachometer-alt,tag,tags,taxi,thumbtack,ticket-alt,toilet,toolbox,tools,train,tram,trash,trash-alt,trash-alt,tree,trophy,truck,tv,umbrella,university,unlock')
  },
  {
    name: 'Payments & Shopping',
    icons: createUniqueIconArr('alipay,amazon-pay,apple-pay,bell,bell,bitcoin,bookmark,bookmark,btc,bullhorn,camera,camera-retro,cart-arrow-down,cart-plus,cc-amazon-pay,cc-amex,cc-apple-pay,cc-diners-club,cc-discover,cc-jcb,cc-mastercard,cc-paypal,cc-stripe,cc-visa,certificate,credit-card,credit-card,ethereum,gem,gem,gift,google-wallet,handshake,handshake,heart,heart,key,money-check,money-check-alt,paypal,receipt,shopping-bag,shopping-basket,shopping-cart,star,star,stripe,stripe-s,tag,tags,thumbs-down,thumbs-down,thumbs-up,thumbs-up,trophy')
  },
  {
    name: 'Pharmacy',
    icons: createUniqueIconArr('band-aid,book-medical,cannabis,capsules,clinic-medical,eye-dropper,file-medical,file-prescription,first-aid,flask,history,joint,laptop-medical,mortar-pestle,notes-medical,pills,prescription,prescription-bottle,prescription-bottle-alt,receipt,skull-crossbones,syringe,tablets,thermometer,vial,vials')
  },
  {
    name: 'Political',
    icons: createUniqueIconArr('award,balance-scale,balance-scale-left,balance-scale-right,bullhorn,check-double,democrat,donate,dove,fist-raised,flag-usa,handshake,handshake,person-booth,piggy-bank,republican,vote-yea')
  },
  {
    name: 'Religion',
    icons: createUniqueIconArr('ankh,atom,bible,church,cross,dharmachakra,dove,gopuram,hamsa,hanukiah,haykal,jedi,journal-whills,kaaba,khanda,menorah,mosque,om,pastafarianism,peace,place-of-worship,pray,praying-hands,quran,star-and-crescent,star-of-david,synagogue,torah,torii-gate,vihara,yin-yang')
  },
  {
    name: 'Science',
    icons: createUniqueIconArr('atom,biohazard,brain,burn,capsules,clipboard-check,dna,eye-dropper,filter,fire,fire-alt,flask,frog,magnet,microscope,mortar-pestle,pills,prescription-bottle,radiation,radiation-alt,seedling,skull-crossbones,syringe,tablets,temperature-high,temperature-low,vial,vials')
  },
  {
    name: 'Science Fiction',
    icons: createUniqueIconArr('galactic-republic,galactic-senate,globe,jedi,jedi-order,journal-whills,meteor,moon,moon,old-republic,robot,rocket,satellite,satellite-dish,space-shuttle,user-astronaut')
  },
  {
    name: 'Security',
    icons: createUniqueIconArr('ban,bug,door-closed,door-open,dungeon,eye,eye,eye-slash,eye-slash,file-contract,file-signature,fingerprint,id-badge,id-badge,id-card,id-card,id-card-alt,key,lock,lock-open,mask,passport,shield-alt,unlock,unlock-alt,user-lock,user-secret,user-shield')
  },
  {
    name: 'Shapes',
    icons: createUniqueIconArr('bookmark,bookmark,calendar,calendar,certificate,circle,circle,cloud,comment,comment,file,file,folder,folder,heart,heart,heart-broken,map-marker,play,shapes,square,square,star,star')
  },
  {
    name: 'Shopping',
    icons: createUniqueIconArr('barcode,cart-arrow-down,cart-plus,cash-register,gift,gifts,person-booth,receipt,shipping-fast,shopping-bag,shopping-basket,shopping-cart,store,store-alt,truck,tshirt')
  },
  {
    name: 'Social',
    icons: createUniqueIconArr('bell,bell,birthday-cake,camera,comment,comment,comment-alt,comment-alt,envelope,envelope,hashtag,heart,heart,icons,image,image,images,images,map-marker,map-marker-alt,photo-video,poll,poll-h,retweet,share,share-alt,share-square,share-square,star,star,thumbs-down,thumbs-down,thumbs-up,thumbs-up,thumbtack,user,user,user-circle,user-circle,user-friends,user-plus,users,video')
  },
  {
    name: 'Spinners',
    icons: createUniqueIconArr('asterisk,atom,certificate,circle-notch,cog,compact-disc,compass,compass,crosshairs,dharmachakra,fan,haykal,life-ring,life-ring,palette,ring,slash,snowflake,snowflake,spinner,stroopwafel,sun,sun,sync,sync-alt,yin-yang')
  },
  {
    name: 'Sports',
    icons: createUniqueIconArr('baseball-ball,basketball-ball,biking,bowling-ball,dumbbell,football-ball,futbol,futbol,golf-ball,hockey-puck,quidditch,running,skating,skiing,skiing-nordic,snowboarding,swimmer,table-tennis,volleyball-ball')
  },
  {
    name: 'Spring',
    icons: createUniqueIconArr('allergies,broom,cloud-sun,cloud-sun-rain,frog,rainbow,seedling,umbrella')
  },
  {
    name: 'Status',
    icons: createUniqueIconArr('ban,battery-empty,battery-full,battery-half,battery-quarter,battery-three-quarters,bell,bell,bell-slash,bell-slash,calendar,calendar,calendar-alt,calendar-alt,calendar-check,calendar-check,calendar-day,calendar-minus,calendar-minus,calendar-plus,calendar-plus,calendar-times,calendar-times,calendar-week,cart-arrow-down,cart-plus,comment,comment,comment-alt,comment-alt,comment-slash,compass,compass,door-closed,door-open,exclamation,exclamation-circle,exclamation-triangle,eye,eye,eye-slash,eye-slash,file,file,file-alt,file-alt,folder,folder,folder-open,folder-open,gas-pump,info,info-circle,lightbulb,lightbulb,lock,lock-open,map-marker,map-marker-alt,microphone,microphone-alt,microphone-alt-slash,microphone-slash,minus,minus-circle,minus-square,minus-square,parking,phone,phone-alt,phone-slash,plus,plus-circle,plus-square,plus-square,print,question,question-circle,question-circle,shield-alt,shopping-cart,sign-in-alt,sign-out-alt,signal,smoking-ban,star,star,star-half,star-half,star-half-alt,stream,thermometer-empty,thermometer-full,thermometer-half,thermometer-quarter,thermometer-three-quarters,thumbs-down,thumbs-down,thumbs-up,thumbs-up,tint,tint-slash,toggle-off,toggle-on,unlock,unlock-alt,user,user,user-alt,user-alt-slash,user-slash,video,video-slash,volume-down,volume-mute,volume-off,volume-up,wifi')
  },
  {
    name: 'Summer',
    icons: createUniqueIconArr('anchor,biking,fish,hotdog,ice-cream,lemon,lemon,sun,sun,swimmer,swimming-pool,umbrella-beach,volleyball-ball,water')
  },
  {
    name: 'Tabletop Gaming',
    icons: createUniqueIconArr('acquisitions-incorporated,book-dead,critical-role,d-and-d,d-and-d-beyond,dice-d20,dice-d6,dragon,dungeon,fantasy-flight-games,fist-raised,hat-wizard,penny-arcade,ring,scroll,skull-crossbones,wizards-of-the-coast')
  },
  {
    name: 'Toggle',
    icons: createUniqueIconArr('bullseye,check-circle,check-circle,circle,circle,dot-circle,dot-circle,microphone,microphone-slash,star,star,star-half,star-half,star-half-alt,toggle-off,toggle-on,wifi')
  },
  {
    name: 'Travel',
    icons: createUniqueIconArr('archway,atlas,bed,bus,bus-alt,cocktail,concierge-bell,dumbbell,glass-martini,glass-martini-alt,globe-africa,globe-americas,globe-asia,globe-europe,hot-tub,hotel,luggage-cart,map,map,map-marked,map-marked-alt,monument,passport,plane,plane-arrival,plane-departure,shuttle-van,spa,suitcase,suitcase-rolling,swimmer,swimming-pool,taxi,tram,tv,umbrella-beach,wine-glass,wine-glass-alt')
  },
  {
    name: 'Users & People',
    icons: createUniqueIconArr('accessible-icon,address-book,address-book,address-card,address-card,baby,bed,biking,blind,chalkboard-teacher,child,female,frown,frown,hiking,id-badge,id-badge,id-card,id-card,id-card-alt,male,meh,meh,people-carry,person-booth,poo,portrait,power-off,pray,restroom,running,skating,skiing,skiing-nordic,smile,smile,snowboarding,street-view,swimmer,user,user,user-alt,user-alt-slash,user-astronaut,user-check,user-circle,user-circle,user-clock,user-cog,user-edit,user-friends,user-graduate,user-injured,user-lock,user-md,user-minus,user-ninja,user-nurse,user-plus,user-secret,user-shield,user-slash,user-tag,user-tie,user-times,users,users-cog,walking,wheelchair')
  },
  {
    name: 'Vehicles',
    icons: createUniqueIconArr('accessible-icon,ambulance,baby-carriage,bicycle,bus,bus-alt,car,car-alt,car-crash,car-side,fighter-jet,helicopter,horse,motorcycle,paper-plane,paper-plane,plane,rocket,ship,shopping-cart,shuttle-van,sleigh,snowplow,space-shuttle,subway,taxi,tractor,train,tram,truck,truck-monster,truck-pickup,wheelchair')
  },
  {
    name: 'Weather',
    icons: createUniqueIconArr('bolt,cloud,cloud-meatball,cloud-moon,cloud-moon-rain,cloud-rain,cloud-showers-heavy,cloud-sun,cloud-sun-rain,meteor,moon,moon,poo-storm,rainbow,smog,snowflake,snowflake,sun,sun,temperature-high,temperature-low,umbrella,water,wind')
  },
  {
    name: 'Winter',
    icons: createUniqueIconArr('glass-whiskey,icicles,igloo,mitten,skating,skiing,skiing-nordic,snowboarding,snowplow,tram')
  },
  {
    name: 'Writing',
    icons: createUniqueIconArr('archive,blog,book,bookmark,bookmark,edit,edit,envelope,envelope,envelope-open,envelope-open,eraser,file,file,file-alt,file-alt,folder,folder,folder-open,folder-open,keyboard,keyboard,newspaper,newspaper,paper-plane,paper-plane,paperclip,paragraph,pen,pen-alt,pen-square,pencil-alt,quote-left,quote-right,sticky-note,sticky-note,thumbtack')
  }
]
