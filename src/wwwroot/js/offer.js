import Navbar from '@/components/Navbar.vue'
import ProfileMainMenu from '@/components/ProfileMainMenu.vue'
import Category from '@/components/Category.vue'

export default {

    name: 'OfferView',
    components: {      
      Navbar,
      ProfileMainMenu,      
      Category  
    },
    data() {
      return {
        userObject:
          {
            photo: "https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg",
            full_name: "José Daniel Camarillo Villa",
            tag_name: "@CamarilloVilla",
            followers: 300,
            amount_offers: 21
          },
        offerInformation: [
          {
            title: "Lorem ipsum 1",
            photo: "https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg",
            full_name: "José Daniel Camarillo Villa",
            tag_name: "@CamarilloVilla",
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
              excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
              cum voluptatum ratione? Ut! 1`,
            score: 3.5
          },
          {
            title: "Lorem ipsum 2",
            photo: "https://mdbootstrap.com/img/Photos/Avatars/img (27).jpg",
            full_name: "José Rodrigo Sánchez Méndez",
            tag_name: "@RodrigoSanchez",
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
              excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
              cum voluptatum ratione? Ut! 2`,
            score: 5
          },
          {
            title: "Lorem ipsum 3",
            photo: "https://mdbootstrap.com/img/Photos/Avatars/img (29).jpg",
            full_name: "Son Goku",
            tag_name: "@Goku",
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nisi dolor, repellat quod minus eveniet, esse saepe eius perspiciatis
              excepturi mollitia ad, eaque dicta dignissimos aspernatur voluptates
              cum voluptatum ratione? Ut! 3`,
            score: 2.1
          }
  
        ]                               
      };
    }
  }