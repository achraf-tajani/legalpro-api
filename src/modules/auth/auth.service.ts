import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const supabase = this.supabaseService.getClient();

    // Authentification via Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const user = data.user;

    // Générer nos propres JWT
    const payload = {
      sub: user.id,
      email: user.email || '',
      role: user.user_metadata?.role || 'USER',
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign({ ...payload, type: 'refresh' });

    return {
      user: {
        id: user.id,
        email: user.email || '',
        nom: user.user_metadata?.nom || '',
        prenom: user.user_metadata?.prenom || '',
        role: user.user_metadata?.role || 'USER',
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async validateUser(userId: string) {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  }
}