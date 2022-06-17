import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import AppConfig from '../config';

type Props = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const useHelmet = ({ title, description, url, image }: Props = {}) => {

  const location = useLocation();

  const params = {
    titleTemplate: `%s | ${AppConfig.site.name}`,
    defaultTitle: AppConfig.site.name,
    canonical: '',
    favicon: '/favicon.ico',
    title,
    meta: [
      { name: 'description', content: description || AppConfig.site.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url || location.pathname },
      { property: 'og:title', content: title || AppConfig.site.name },
      { property: 'og:site_name', content:  AppConfig.site.name },
      { property: 'og:description', content: description || AppConfig.site.description },
      { property: 'og:image', content: image }
    ]
  };

  return () => (<Helmet {...params} />)
};

export default useHelmet;