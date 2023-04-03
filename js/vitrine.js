//PUB

fetch("./json/pub.json")
    .then((res) => res.json())
    .then((data) => {

        // Listes des Pub-img
        let publicite = document.getElementById("main-pub");
        
        for (const pub of data.pubs) 
        {

           let vitrineHTML = `
           <a href="${pub.link}" title="${pub.name}"><img src="${pub.photo}" alt="PUB" class="slider"></a>
           `;

            publicite.insertAdjacentHTML("beforeend", vitrineHTML);

        }

        // Slider
        let img_slider = document.getElementsByClassName('slider');
        let etape = 0;
        let nbr_img = img_slider.length;
        
        // Récupérer les selecteurs précédent/suivant
        let next = document.querySelector('.next');
        let back = document.querySelector('.back');

        // Ajouter .active sur la première image
        img_slider[0].classList.add('active');
        
        // Enlever .active sur toutes les images
        function enleverActiveImages() {
            for(let i = 0 ; i < nbr_img ; i++) {
                img_slider[i].classList.remove('active');
            }
        };
        
        // Utiliser les sélecteurs back/next
        next.addEventListener('click', function() {
            etape++;
            if(etape >= nbr_img) {
                etape = 0;
            }
            enleverActiveImages();
            img_slider[etape].classList.add('active');
        });
        
        back.addEventListener('click', function() {
            etape--;
            if(etape < 0) {
                etape = nbr_img - 1;
            }
            enleverActiveImages();
            img_slider[etape].classList.add('active');
        });
        
        // Défilement automatique du Slider (Timer de 5s)
        setInterval(function() {
            etape++;
            if(etape >= nbr_img) {
                etape = 0;
            }
            enleverActiveImages();
            img_slider[etape].classList.add('active');
        }, 5000);
    });

    

//VITRINE DE JEUX

fetch("./json/vitrine-jeu.json")
.then((res) => res.json())
.then((data) => 
{
    // Container HTML des vitrines
    function containerVitrineHTML (data, id)
    {
        let vitrine = document.getElementById(id);
        
        for (const jeu of data) 
        {
            //VITRINE
            let vitrineHTML = `
            <div class="vitrine-jeu">
                            <a href="#" alt="${jeu.name}" title="${jeu.name}"><img class="vitrine-jeu-img" src="${jeu.photo}" alt="${jeu.name}"></a>
                            <ul>
                                <li>${jeu.name}</li>
                                <li id="jeu-rating-${jeu.name}">
                                <span class="rating fa fa-star star-${jeu.name}"></span>
                                <span class="rating fa fa-star star-${jeu.name}"></span>
                                <span class="rating fa fa-star star-${jeu.name}"></span>
                                <span class="rating fa fa-star star-${jeu.name}"></span>
                                <span class="rating fa fa-star star-${jeu.name}"></span>
                                </li>
                                <li class="vitrine-jeu-achat"><samp>${jeu.price}€</samp><a href="#"><i class="fa-solid fa-cart-arrow-down"></i></a></li>
                            </ul>
                        </div>
            `;
    
            vitrine.insertAdjacentHTML("beforeend", vitrineHTML);

            //RATING
            function jeuRating (rating) 
            {   
                let gameRating = document.getElementById(`jeu-rating-${jeu.name}`);

                let star = document.getElementsByClassName(`star-${jeu.name}`);

                const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
                let ratingNbr = clamp(Math.round(rating) , 0 , 5);
                

                if (ratingNbr == 0) {
                    gameRating.classList.add('noAvis');
                } 
                else {
                    for(let i = 0 ; i < ratingNbr ; i++) 
                    {
                        star[i].classList.add('checked');
                    }
                }
            }

            jeuRating(`${jeu.rating}`);

        }
    }   
        
    //BESTGAMES
    containerVitrineHTML(data.best, "bestgames");

    
    //NEWGAMES
    containerVitrineHTML(data.news, "newgames");


 });

 console.log("hello");