import { Button } from "@/components/ui/button";

interface ButtonToolProps {
    onClick: () => void;
    buttonTitle: string;
    buttonClassName?: string;
}

export const ButtonTool = ({ onClick, buttonTitle, buttonClassName }: ButtonToolProps) => {
    return (
        <Button onClick={onClick} className={buttonClassName}>
            {buttonTitle}
        </Button>
    );
};
