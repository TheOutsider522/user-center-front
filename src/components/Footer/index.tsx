import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = '宋学亮项目学习';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'user-center-key',
          title: '用户中心',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <> <GithubOutlined /> 宋学亮 GitHub </>,
          href: 'https://github.com/TheOutsider522',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: '用户项目',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
