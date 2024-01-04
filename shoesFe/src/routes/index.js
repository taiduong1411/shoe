import AboutUsPage from "../pages/AboutUspage/AboutUsPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import Contact from "../pages/Contact/Contact";
import DeliveryPolicy from "../pages/DeliveryPolicyPage/DeliveryPolicy";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import HomePage from "../pages/HomePage/HomePage";
import MyOderPage from "../pages/MyOderPage/MyOderPage";
import News from "../pages/News/News";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OderPage from "../pages/OderPage/OderPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import PrivacyPage from "../pages/PrivacyPage/PrivacyPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ReturnPolicy from "../pages/ReturnPolicy/ReturnPolicy";
import Services from "../pages/Services/Services";
import ShoppingGuidePage from "../pages/ShoppingGuidePage/ShoppingGuidePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import WarrantyPage from "../pages/WarrantyPage/WarrantyPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: OderPage,
    isShowHeader: true,
  },
  {
    path: "/my-order",
    page: MyOderPage,
    isShowHeader: true,
  },
  {
    path: "/details-order/:id",
    page: DetailsOrderPage,
    isShowHeader: true,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
  },
  {
    path: "/orderSuccess",
    page: OrderSuccess,
    isShowHeader: true,
  },
  {
    path: "/product",
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/product/:type",
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: true,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: true,
  },
  {
    path: "/product-details/:id",
    page: ProductDetailsPage,
    isShowHeader: true,
  },
  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: "/news",
    page: News,
    isShowHeader: true,
  },
  {
    path: "/about-us",
    page: AboutUsPage,
    isShowHeader: true,
  },
  {
    path: "/Shopping-Guide",
    page: ShoppingGuidePage,
    isShowHeader: true,
  },
  {
    path: "/Delivery-Policy",
    page: DeliveryPolicy,
    isShowHeader: true,
  },
  {
    path: "/Return-Policy",
    page: ReturnPolicy,
    isShowHeader: true,
  },
  {
    path: "/Warranty",
    page: WarrantyPage,
    isShowHeader: true,
  },
  {
    path: "/Privacy",
    page: PrivacyPage,
    isShowHeader: true,
  },
  {
    path: "/services",
    page: Services,
    isShowHeader: true,
  },
  {
    path: "/contact",
    page: Contact,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
