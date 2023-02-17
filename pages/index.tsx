import LoginLayout from "@/components/organisms/loginLayout";
import HomeTemplate from '@/components/organisms/home';
import { LoginProvider } from "@/utils/hooks/useLogin";
import { MainContainer } from '@/styles/index.styles';

export default function Home() {

	return (
		<MainContainer>
			<LoginProvider>
				<LoginLayout>
					<HomeTemplate/>
				</LoginLayout>
			</LoginProvider>
		</MainContainer>
	);
}
