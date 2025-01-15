"use client";

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { UserButton } from '@/features/auth/components/user-button';
import { Separator } from '@radix-ui/react-separator';
import { MousePointerClick, Redo2, Undo2 } from 'lucide-react';
import React from 'react';

function Teste() {
    return (
        <div className="bg-[#D9D9D9] h-screen w-screen flex justify-end pt-4 pr-2">
            <div className="w-[600px] h-[42px] bg-[#FFFFFF] rounded-[50px] flex">
                <div className='flex-none w-14'>
                    <Hint label="Selecionar" side="bottom" sideOffset={10}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={"bg-gray-100"}
                        >
                            <MousePointerClick className="size-4" />
                        </Button>
                    </Hint>
                </div>
                <Hint label="Desfazer" side="bottom" sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <Undo2 className="size-4" />
                    </Button>
                </Hint>
                <Hint label="Refazer" side="bottom" sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <Redo2 className="size-4" />
                    </Button>
                </Hint>

                <div className="text-xs text-muted-foreground">
                    Salvando...
                </div>
                <UserButton />
            </div>
        </div>
    );
}

export default Teste;
