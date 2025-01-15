import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ message: 'URL is required' }, { status: 400 });
    }

    // Inicia o Puppeteer
    const browser = await puppeteer.launch({
      headless: true, // Utiliza o modo headless para evitar avisos
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Evita problemas de permissão em ambientes limitados
    });

    const page = await browser.newPage();

    await page.goto(url);
    const screenshot = await page.screenshot({ type: 'png' });

    await browser.close();

    // Configura o retorno da imagem como PNG
    return new NextResponse(screenshot, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ message: 'Error generating image' }, { status: 500 });
  }
}
