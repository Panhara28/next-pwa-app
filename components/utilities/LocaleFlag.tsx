import { useRouter } from 'next/router';

type Props = {
  locales: string[]
}

const LocaleFlag = (props: React.PropsWithChildren<Props>) => {
  const router = useRouter();
  
  return props.locales.indexOf(router.locale) > -1 ? <>{props.children}</> : null;
}

export default LocaleFlag;