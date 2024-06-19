export const routes = [
    // {
    //   title: "Dashboard",
    //   slug: "/admin/home",
    //   icon: "/icons/home-icon.svg",
    //   activeIcon: "/icons/home-icon-selected.svg",
    // },
    {
      title: "Pedidos",
      slug: "/admin/pedidos",
      icon: "/icons/basket_white.svg",
      activeIcon: "/icons/order_turquoise.svg",
    },
    {
      title: "Menu",
      slug: "/admin/menu",
      icon: "/icons/menu_white.svg",
      activeIcon: "/icons/menu_turquoise.svg",
      subRoutes: [
        {
          title: "Proteinas",
          slug: "/admin/menu/proteins",
          icon: "/icons/proteins-icon.svg",
        },
        {
          title: "Vegetales",
          slug: "/admin/menu/vegetables",
          icon: "/icons/vegetables-icon.svg",
        },
        {
          title: "Opcionales",
          slug: "/admin/menu/sidedishes",
          icon: "/icons/sideDish-icon.svg",
        },
        {
          title: "Bebidas",
          slug: "/admin/menu/bebidas",
          icon: "/icons/drinks.svg",
        },
        {
          title: "Extras",
          slug: "/admin/menu/extras",
          icon: "/icons/extra-icon.svg",
        },
      ],
    },
  ];